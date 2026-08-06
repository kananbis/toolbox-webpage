export type CodecAsset = {
  url: string;
  type: "module" | "script" | "wasm" | "worker";
  sha256: string;
  sri?: string;
};

export type CodecDefinition = {
  id: string;
  version: string;
  license: string;
  homepage: string;
  assets: CodecAsset[];
  capabilities: {
    decode?: string[];
    encode?: string[];
    animation?: boolean;
    multiPage?: boolean;
    multiSize?: boolean;
  };
  enabled: boolean;
  disabledReason: string;
};

export const IMAGE_CONVERTER_FEATURES = {
  basicStillFormats: true,
  svgInput: true,
  apngFrameZip: true,
  bmpInput: true,
  bmpOutput: true,
  avifNative: true,
  avifExternalEncode: true,
  heifInput: true,
  tiffInput: true,
  icoInput: true,
  icoOutput: true,
  animatedGif: true,
  animatedWebp: false,
  multiPageTiff: true,
  zipOutput: true,
} as const;

export const CODEC_MANIFEST: Record<string, CodecDefinition> = {
  "avif-encode": {
    id: "avif-encode",
    version: "@jsquash/avif 2.1.1",
    license: "Apache-2.0",
    homepage: "https://github.com/jamsinclair/jSquash",
    assets: [
      {
        type: "module",
        url: "https://esm.sh/@jsquash/avif@2.1.1?bundle&target=es2022",
        sha256: "3fd1901a22a4e2de4a142c0feca880787270001e35f497fb0695083a3f0f054d",
      },
      {
        type: "wasm",
        url: "https://cdn.jsdelivr.net/npm/@jsquash/avif@2.1.1/codec/enc/avif_enc.wasm",
        sha256: "d9f2a95164362af48558d176e619becfd49dd97b50b86c679b47100860522b3d",
      },
      {
        type: "wasm",
        url: "https://cdn.jsdelivr.net/npm/@jsquash/avif@2.1.1/codec/enc/avif_enc_mt.wasm",
        sha256: "202d7ec9fb7d658df7cbf17fd85d83da724ac9551818c2d5161c858353a683a4",
      },
      {
        type: "worker",
        url: "https://cdn.jsdelivr.net/npm/@jsquash/avif@2.1.1/codec/enc/avif_enc_mt.worker.mjs",
        sha256: "89a64cae14ec07dec00cdd6df943fad039501e9eef1748fb1504508d4252bafe",
      },
    ],
    capabilities: { encode: ["image/avif"] },
    enabled: true,
    disabledReason: "AVIF output is encoded with @jsquash/avif loaded lazily from fixed external CDN assets when native browser encoding is unavailable.",
  },
  heif: {
    id: "heif",
    version: "0.0.4",
    license: "MIT",
    homepage: "https://github.com/alexcorvi/heic2any",
    assets: [
      {
        type: "script",
        url: "https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js",
        sha256: "0963cfa50e9e1e7e6af929a40a81e3e898a673f1270eafa6917dd137e4968164",
        sri: "sha256-CWPPpQ6eHn5q+SmkCoHj6Jimc/EnDq+mkX3RN+SWgWQ=",
      },
    ],
    capabilities: { decode: ["image/heic", "image/heif"] },
    enabled: true,
    disabledReason: "HEIC/HEIF input is decoded with heic2any from a fixed external CDN asset. HEIC output remains unsupported.",
  },
  tiff: {
    id: "tiff",
    version: "3.1.0",
    license: "MIT",
    homepage: "https://github.com/photopea/UTIF.js",
    assets: [
      {
        type: "script",
        url: "https://cdn.jsdelivr.net/npm/utif@3.1.0/UTIF.js",
        sha256: "e3e76115f49571e39624c3316a76b3c4c5b2c5ca518dfec4b66a9f7af8c6d059",
        sri: "sha256-4+dhFfSVceOWJMMxanazxMWyxcpRjf7EtmqfevjG0Fk=",
      },
    ],
    capabilities: { decode: ["image/tiff"], multiPage: true },
    enabled: true,
    disabledReason: "TIFF input is decoded with UTIF.js from a fixed external CDN asset. TIFF output remains unsupported.",
  },
  ico: {
    id: "ico",
    version: "built-in-png-ico",
    license: "site-code",
    homepage: "",
    assets: [],
    capabilities: { decode: ["image/x-icon"], encode: ["image/x-icon"], multiSize: true },
    enabled: true,
    disabledReason: "PNG-based ICO input and PNG-based multi-size ICO output are implemented without external codec assets. BMP-based ICO input remains unsupported.",
  },
  animation: {
    id: "animation",
    version: "gifuct-js 1.0.0",
    license: "MIT",
    homepage: "https://github.com/matt-way/gifuct-js",
    assets: [
      {
        type: "script",
        url: "https://cdn.jsdelivr.net/npm/gifuct-js@1.0.0/dist/gifuct-js.min.js",
        sha256: "4a8ca0d929fcf7461536907a1ba7808d8969149221f08b70fa8864d62e620220",
        sri: "sha256-Soyg2Sn890YVNpB6G6eAjYlpFJIh8Itw+ohk1i5iAiA=",
      },
    ],
    capabilities: { decode: ["image/gif"], animation: true },
    enabled: true,
    disabledReason: "GIF animation input can be decoded for PNG frame ZIP export. Animated GIF/WebP re-encoding remains unsupported.",
  },
  zip: {
    id: "zip",
    version: "3.10.1",
    license: "MIT OR GPL-3.0-or-later",
    homepage: "https://github.com/Stuk/jszip",
    assets: [
      {
        type: "script",
        url: "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",
        sha256: "acc7e41455a80765b5fd9c7ee1b8078a6d160bbbca455aeae854de65c947d59e",
        sri: "sha256-rMfkFFWoB2W1/Zx+4bgHim0WC7vKRVrq6FTeZclH1Z4=",
      },
    ],
    capabilities: {},
    enabled: true,
    disabledReason: "ZIP output is available for multi-page TIFF page export and GIF frame extraction through JSZip.",
  },
};
