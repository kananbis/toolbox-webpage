export type PaletteName = "source" | "mono" | "gameboy" | "eightbit" | "pastel" | "neon" | "warm" | "cool" | "custom";
export type DitherMode = "none" | "floyd" | "bayer2" | "bayer4";
export type OutlineMode = "none" | "light" | "normal" | "strong";

export type PixelArtSettings = {
  pixelSize: number;
  colorCount: number;
  palette: PaletteName;
  customPalette: string[];
  dither: DitherMode;
  ditherStrength: number;
  outline: OutlineMode;
  outlineColor: string;
  brightness: number;
  contrast: number;
  saturation: number;
  backgroundColor: string;
  outputScale: number;
  outputFormat: "image/png" | "image/webp" | "image/jpeg";
  quality: number;
};

type Rgb = { r: number; g: number; b: number };

const clamp = (value: number, min = 0, max = 255) => Math.max(min, Math.min(max, value));

const parseHex = (hex: string): Rgb | null => {
  const normalized = hex.trim().replace(/^#/, "");
  const expanded = /^[0-9a-fA-F]{3}$/.test(normalized)
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized;
  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return null;
  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
};

const palettes: Record<Exclude<PaletteName, "source" | "custom">, string[]> = {
  mono: ["#111827", "#6b7280", "#d1d5db", "#ffffff"],
  gameboy: ["#0f380f", "#306230", "#8bac0f", "#9bbc0f"],
  eightbit: ["#000000", "#ffffff", "#ff004d", "#ffa300", "#ffec27", "#00e436", "#29adff", "#83769c", "#ff77a8"],
  pastel: ["#f8b4c4", "#b8e0d2", "#d6c7ff", "#fff2b2", "#a7c7e7", "#f6d6ad"],
  neon: ["#0b1026", "#ff2bd6", "#00f5ff", "#b6ff00", "#ff9f1c", "#ffffff"],
  warm: ["#2d1606", "#7f1d1d", "#c2410c", "#f59e0b", "#fde68a", "#fff7ed"],
  cool: ["#0f172a", "#1d4ed8", "#0891b2", "#14b8a6", "#bfdbfe", "#f8fafc"],
};

const hexPalette = (colors: string[]) => colors.map(parseHex).filter((color): color is Rgb => Boolean(color));

const colorDistance = (a: Rgb, b: Rgb) => (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;

const nearestColor = (color: Rgb, palette: Rgb[]) => {
  if (!palette.length) return color;
  let best = palette[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const item of palette) {
    const distance = colorDistance(color, item);
    if (distance < bestDistance) {
      best = item;
      bestDistance = distance;
    }
  }
  return best;
};

const adjustColor = (r: number, g: number, b: number, brightness: number, contrast: number, saturation: number): Rgb => {
  const brightnessOffset = brightness * 2.55;
  const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  let nr = clamp(contrastFactor * (r + brightnessOffset - 128) + 128);
  let ng = clamp(contrastFactor * (g + brightnessOffset - 128) + 128);
  let nb = clamp(contrastFactor * (b + brightnessOffset - 128) + 128);
  const gray = 0.2126 * nr + 0.7152 * ng + 0.0722 * nb;
  const sat = saturation / 100;
  nr = clamp(gray + (nr - gray) * sat);
  ng = clamp(gray + (ng - gray) * sat);
  nb = clamp(gray + (nb - gray) * sat);
  return { r: nr, g: ng, b: nb };
};

function buildSourcePalette(data: Uint8ClampedArray, colorCount: number): Rgb[] {
  if (colorCount <= 0) return [];
  const buckets = new Map<string, { color: Rgb; count: number }>();
  for (let index = 0; index < data.length; index += 16) {
    const a = data[index + 3];
    if (a < 10) continue;
    const r = Math.round(data[index] / 32) * 32;
    const g = Math.round(data[index + 1] / 32) * 32;
    const b = Math.round(data[index + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    const current = buckets.get(key);
    if (current) current.count += 1;
    else buckets.set(key, { color: { r, g, b }, count: 1 });
  }
  return [...buckets.values()].sort((a, b) => b.count - a.count).slice(0, colorCount).map((item) => item.color);
}

const bayer2 = [
  [0, 2],
  [3, 1],
];

const bayer4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

function applyOrderedDither(color: Rgb, x: number, y: number, mode: DitherMode, strength: number): Rgb {
  if (mode !== "bayer2" && mode !== "bayer4") return color;
  const matrix = mode === "bayer2" ? bayer2 : bayer4;
  const size = matrix.length;
  const threshold = ((matrix[y % size][x % size] + 0.5) / (size * size) - 0.5) * strength * 2.2;
  return {
    r: clamp(color.r + threshold),
    g: clamp(color.g + threshold),
    b: clamp(color.b + threshold),
  };
}

function applyOutline(imageData: ImageData, mode: OutlineMode, outlineColor: Rgb) {
  if (mode === "none") return imageData;
  const threshold = mode === "light" ? 95 : mode === "normal" ? 65 : 42;
  const output = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
  const luminance = (index: number) => 0.2126 * imageData.data[index] + 0.7152 * imageData.data[index + 1] + 0.0722 * imageData.data[index + 2];
  for (let y = 0; y < imageData.height - 1; y += 1) {
    for (let x = 0; x < imageData.width - 1; x += 1) {
      const index = (y * imageData.width + x) * 4;
      const right = (y * imageData.width + x + 1) * 4;
      const bottom = ((y + 1) * imageData.width + x) * 4;
      if (Math.abs(luminance(index) - luminance(right)) > threshold || Math.abs(luminance(index) - luminance(bottom)) > threshold) {
        output.data[index] = outlineColor.r;
        output.data[index + 1] = outlineColor.g;
        output.data[index + 2] = outlineColor.b;
        output.data[index + 3] = 255;
      }
    }
  }
  return output;
}

export function createPixelArt(image: HTMLImageElement, settings: PixelArtSettings): HTMLCanvasElement {
  const sourceWidth = image.naturalWidth;
  const sourceHeight = image.naturalHeight;
  const maxSide = 1400;
  const baseScale = Math.min(1, maxSide / Math.max(sourceWidth, sourceHeight));
  const workingWidth = Math.max(1, Math.round(sourceWidth * baseScale));
  const workingHeight = Math.max(1, Math.round(sourceHeight * baseScale));
  const pixelSize = Math.max(1, Math.min(64, Math.round(settings.pixelSize)));
  const smallWidth = Math.max(1, Math.round(workingWidth / pixelSize));
  const smallHeight = Math.max(1, Math.round(workingHeight / pixelSize));
  const smallCanvas = document.createElement("canvas");
  smallCanvas.width = smallWidth;
  smallCanvas.height = smallHeight;
  const smallContext = smallCanvas.getContext("2d", { willReadFrequently: true });
  if (!smallContext) throw new Error("Canvas context failed.");
  smallContext.drawImage(image, 0, 0, smallWidth, smallHeight);
  let imageData = smallContext.getImageData(0, 0, smallWidth, smallHeight);
  const background = parseHex(settings.backgroundColor) ?? { r: 255, g: 255, b: 255 };
  const outlineColor = parseHex(settings.outlineColor) ?? { r: 17, g: 24, b: 39 };
  const sourcePalette = settings.palette === "source" ? buildSourcePalette(imageData.data, settings.colorCount) : [];
  const fixedPalette = settings.palette === "custom"
    ? hexPalette(settings.customPalette)
    : settings.palette === "source"
      ? sourcePalette
      : hexPalette(palettes[settings.palette]);
  const palette = settings.colorCount > 0 && fixedPalette.length > settings.colorCount
    ? fixedPalette.slice(0, settings.colorCount)
    : fixedPalette;

  const data = imageData.data;
  const errors = new Float32Array(data.length);
  const strength = settings.ditherStrength / 100;

  for (let y = 0; y < smallHeight; y += 1) {
    for (let x = 0; x < smallWidth; x += 1) {
      const index = (y * smallWidth + x) * 4;
      const alpha = data[index + 3] / 255;
      let r = data[index] * alpha + background.r * (1 - alpha) + errors[index];
      let g = data[index + 1] * alpha + background.g * (1 - alpha) + errors[index + 1];
      let b = data[index + 2] * alpha + background.b * (1 - alpha) + errors[index + 2];
      let adjusted = adjustColor(r, g, b, settings.brightness, settings.contrast, settings.saturation);
      adjusted = applyOrderedDither(adjusted, x, y, settings.dither, settings.ditherStrength);
      const quantized = settings.palette === "source" && settings.colorCount === 0 ? adjusted : nearestColor(adjusted, palette);
      data[index] = quantized.r;
      data[index + 1] = quantized.g;
      data[index + 2] = quantized.b;
      data[index + 3] = alpha < 0.04 ? 0 : 255;

      if (settings.dither === "floyd" && palette.length) {
        const er = (adjusted.r - quantized.r) * strength;
        const eg = (adjusted.g - quantized.g) * strength;
        const eb = (adjusted.b - quantized.b) * strength;
        const spread = (dx: number, dy: number, factor: number) => {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= smallWidth || ny < 0 || ny >= smallHeight) return;
          const ni = (ny * smallWidth + nx) * 4;
          errors[ni] += er * factor;
          errors[ni + 1] += eg * factor;
          errors[ni + 2] += eb * factor;
        };
        spread(1, 0, 7 / 16);
        spread(-1, 1, 3 / 16);
        spread(0, 1, 5 / 16);
        spread(1, 1, 1 / 16);
      }
    }
  }

  imageData = applyOutline(imageData, settings.outline, outlineColor);
  smallContext.putImageData(imageData, 0, 0);

  const outputScale = Math.max(1, Math.min(6, settings.outputScale));
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = smallWidth * pixelSize * outputScale;
  outputCanvas.height = smallHeight * pixelSize * outputScale;
  const outputContext = outputCanvas.getContext("2d");
  if (!outputContext) throw new Error("Canvas context failed.");
  if (settings.outputFormat === "image/jpeg") {
    outputContext.fillStyle = settings.backgroundColor;
    outputContext.fillRect(0, 0, outputCanvas.width, outputCanvas.height);
  }
  outputContext.imageSmoothingEnabled = false;
  outputContext.drawImage(smallCanvas, 0, 0, outputCanvas.width, outputCanvas.height);
  return outputCanvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Export failed."));
    }, mimeType, mimeType === "image/png" ? undefined : Math.max(0.1, Math.min(1, quality)));
  });
}
