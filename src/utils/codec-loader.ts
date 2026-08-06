import { CODEC_MANIFEST, type CodecDefinition } from "@/utils/image-converter-codecs";

export type CodecStatus = "idle" | "loading" | "ready" | "error";

export type LoadedCodec = {
  id: string;
  version: string;
  definition: CodecDefinition;
  assets: Map<string, ArrayBuffer>;
  dispose?: () => void;
};

type LoadOptions = {
  signal?: AbortSignal;
  timeoutMs?: number;
  onProgress?: (loaded: number, total?: number) => void;
};

const statuses = new Map<string, CodecStatus>();
const loadedCodecs = new Map<string, LoadedCodec>();
const loadingPromises = new Map<string, Promise<LoadedCodec>>();

const toHex = (bytes: Uint8Array) => Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");

const mergeSignals = (signals: AbortSignal[]) => {
  const controller = new AbortController();
  const abort = () => controller.abort();
  signals.filter(Boolean).forEach((signal) => {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", abort, { once: true });
  });
  return controller.signal;
};

export const fetchAndVerifyCodecAsset = async (
  url: string,
  expectedSha256: string,
  options: LoadOptions = {},
) => {
  if (!expectedSha256) throw new Error("CODEC_HASH_REQUIRED");

  const timeout = new AbortController();
  const timeoutId = window.setTimeout(() => timeout.abort(), options.timeoutMs ?? 20000);
  const signal = mergeSignals([timeout.signal, options.signal].filter(Boolean) as AbortSignal[]);

  try {
    const response = await fetch(url, {
      mode: "cors",
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin",
      signal,
    });

    if (!response.ok) throw new Error(`CODEC_HTTP_${response.status}`);

    const total = Number(response.headers.get("content-length")) || undefined;
    if (!response.body) {
      const buffer = await response.arrayBuffer();
      options.onProgress?.(buffer.byteLength, total);
      return verifyCodecHash(buffer, expectedSha256);
    }

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let loaded = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      chunks.push(value);
      loaded += value.byteLength;
      options.onProgress?.(loaded, total);
    }

    const buffer = new Uint8Array(loaded);
    let offset = 0;
    chunks.forEach((chunk) => {
      buffer.set(chunk, offset);
      offset += chunk.byteLength;
    });
    return verifyCodecHash(buffer.buffer, expectedSha256);
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const verifyCodecHash = async (buffer: ArrayBuffer, expectedSha256: string) => {
  const digest = await crypto.subtle.digest("SHA-256", buffer);
  const actual = toHex(new Uint8Array(digest));
  if (actual !== expectedSha256.toLowerCase()) throw new Error("CODEC_INTEGRITY_MISMATCH");
  return buffer;
};

export const loadCodec = async (codecId: string, options: LoadOptions = {}): Promise<LoadedCodec> => {
  const cached = loadedCodecs.get(codecId);
  if (cached) return cached;

  const existing = loadingPromises.get(codecId);
  if (existing) return existing;

  const definition = CODEC_MANIFEST[codecId];
  if (!definition) throw new Error("CODEC_NOT_FOUND");
  if (!definition.enabled) throw new Error(definition.disabledReason || "CODEC_DISABLED");
  if (definition.assets.length === 0) {
    const loaded: LoadedCodec = { id: definition.id, version: definition.version, definition, assets: new Map() };
    loadedCodecs.set(codecId, loaded);
    statuses.set(codecId, "ready");
    return loaded;
  }

  statuses.set(codecId, "loading");
  const promise = Promise.all(
    definition.assets.map(async (asset) => [asset.url, await fetchAndVerifyCodecAsset(asset.url, asset.sha256, options)] as const),
  )
    .then((entries) => {
      const loaded: LoadedCodec = {
        id: definition.id,
        version: definition.version,
        definition,
        assets: new Map(entries),
      };
      loadedCodecs.set(codecId, loaded);
      statuses.set(codecId, "ready");
      return loaded;
    })
    .catch((error) => {
      statuses.set(codecId, "error");
      throw error;
    })
    .finally(() => {
      loadingPromises.delete(codecId);
    });

  loadingPromises.set(codecId, promise);
  return promise;
};

export const getCodecStatus = (codecId: string): CodecStatus => statuses.get(codecId) || "idle";

export const disposeCodec = (codecId?: string) => {
  const ids = codecId ? [codecId] : Array.from(loadedCodecs.keys());
  ids.forEach((id) => {
    loadedCodecs.get(id)?.dispose?.();
    loadedCodecs.delete(id);
    loadingPromises.delete(id);
    statuses.delete(id);
  });
};
