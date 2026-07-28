export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type RgbaColor = RgbColor & {
  a: number;
};

export type ColorReplacementOptions = {
  targetColor: RgbColor;
  replacementColor: RgbColor;
  tolerance: number;
  preserveShading: boolean;
};

export type ColorTransparencyOptions = {
  targetColor: RgbColor;
  tolerance: number;
  mode: "full" | "soft";
  reduceFringe: boolean;
};

const MAX_RGB_DISTANCE = Math.sqrt(255 * 255 * 3);

const clampByte = (value: number) => Math.max(0, Math.min(255, Math.round(value)));

export function parseHexColor(value: string): RgbColor | null {
  const normalized = value.trim().replace(/^#/, "");
  const expanded = /^[0-9a-fA-F]{3}$/.test(normalized)
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return null;

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
}

export function rgbToHex(color: RgbColor): string {
  return `#${[color.r, color.g, color.b].map((value) => clampByte(value).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

export function rgbToText(color: RgbColor): string {
  return `rgb(${clampByte(color.r)}, ${clampByte(color.g)}, ${clampByte(color.b)})`;
}

export function calculateColorDistance(a: RgbColor, b: RgbColor): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

export function toleranceToThreshold(tolerance: number): number {
  return MAX_RGB_DISTANCE * Math.max(0, Math.min(100, tolerance)) / 100;
}

export function isColorWithinTolerance(color: RgbColor, targetColor: RgbColor, tolerance: number): boolean {
  const threshold = toleranceToThreshold(tolerance);
  const distance = calculateColorDistance(color, targetColor);
  return tolerance <= 0 ? distance === 0 : distance <= threshold;
}

function rgbToHsl(color: RgbColor) {
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) return { h: 0, s: 0, l: lightness };

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue = 0;

  if (max === r) hue = 60 * (((g - b) / delta) % 6);
  if (max === g) hue = 60 * ((b - r) / delta + 2);
  if (max === b) hue = 60 * ((r - g) / delta + 4);

  return { h: hue < 0 ? hue + 360 : hue, s: saturation, l: lightness };
}

function hslToRgb(h: number, s: number, l: number): RgbColor {
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - chroma / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [chroma, x, 0];
  else if (h < 120) [r, g, b] = [x, chroma, 0];
  else if (h < 180) [r, g, b] = [0, chroma, x];
  else if (h < 240) [r, g, b] = [0, x, chroma];
  else if (h < 300) [r, g, b] = [x, 0, chroma];
  else [r, g, b] = [chroma, 0, x];

  return {
    r: clampByte((r + m) * 255),
    g: clampByte((g + m) * 255),
    b: clampByte((b + m) * 255),
  };
}

export function getPixelColor(imageData: ImageData, x: number, y: number): RgbaColor {
  const safeX = Math.max(0, Math.min(imageData.width - 1, Math.round(x)));
  const safeY = Math.max(0, Math.min(imageData.height - 1, Math.round(y)));
  const index = (safeY * imageData.width + safeX) * 4;
  return {
    r: imageData.data[index],
    g: imageData.data[index + 1],
    b: imageData.data[index + 2],
    a: imageData.data[index + 3],
  };
}

export function applyColorReplacement(source: ImageData, options: ColorReplacementOptions): ImageData {
  const output = new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);
  const replacementHsl = rgbToHsl(options.replacementColor);

  for (let index = 0; index < output.data.length; index += 4) {
    const alpha = source.data[index + 3];
    if (alpha === 0) continue;

    const color = { r: source.data[index], g: source.data[index + 1], b: source.data[index + 2] };
    if (!isColorWithinTolerance(color, options.targetColor, options.tolerance)) continue;

    const nextColor = options.preserveShading
      ? hslToRgb(replacementHsl.h, replacementHsl.s, rgbToHsl(color).l)
      : options.replacementColor;

    output.data[index] = nextColor.r;
    output.data[index + 1] = nextColor.g;
    output.data[index + 2] = nextColor.b;
    output.data[index + 3] = alpha;
  }

  return output;
}

export function applyColorTransparency(source: ImageData, options: ColorTransparencyOptions): ImageData {
  const output = new ImageData(new Uint8ClampedArray(source.data), source.width, source.height);
  const threshold = toleranceToThreshold(options.tolerance);

  for (let index = 0; index < output.data.length; index += 4) {
    const originalAlpha = source.data[index + 3];
    if (originalAlpha === 0) continue;

    const color = { r: source.data[index], g: source.data[index + 1], b: source.data[index + 2] };
    const distance = calculateColorDistance(color, options.targetColor);
    const within = options.tolerance <= 0 ? distance === 0 : distance <= threshold;
    if (!within) continue;

    if (options.mode === "full" || threshold === 0) {
      output.data[index + 3] = 0;
      continue;
    }

    const ratio = Math.max(0, Math.min(1, distance / threshold));
    const smoothRatio = ratio * ratio * (3 - 2 * ratio);
    const nextAlpha = clampByte(originalAlpha * smoothRatio);
    output.data[index + 3] = nextAlpha;

    if (options.reduceFringe && nextAlpha > 0 && nextAlpha < originalAlpha) {
      const correction = 0.18 * (1 - smoothRatio);
      output.data[index] = clampByte(color.r + (color.r - options.targetColor.r) * correction);
      output.data[index + 1] = clampByte(color.g + (color.g - options.targetColor.g) * correction);
      output.data[index + 2] = clampByte(color.b + (color.b - options.targetColor.b) * correction);
    }
  }

  return output;
}

export function buildOutputFilename(originalName: string, suffix: string, mimeType: string): string {
  const baseName = originalName.replace(/\.[^.]+$/, "") || "image";
  const extension = mimeType === "image/webp" ? "webp" : mimeType === "image/jpeg" ? "jpg" : "png";
  return `${baseName}${suffix}.${extension}`;
}

export function createDownloadBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    const outputContext = outputCanvas.getContext("2d");
    if (!outputContext) {
      reject(new Error("Canvas context could not be created."));
      return;
    }

    if (mimeType === "image/jpeg") {
      outputContext.fillStyle = "#ffffff";
      outputContext.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
    }

    outputContext.drawImage(canvas, 0, 0);
    outputCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Image encoding failed."));
      },
      mimeType,
      mimeType === "image/png" ? undefined : Math.max(0.1, Math.min(1, quality)),
    );
  });
}
