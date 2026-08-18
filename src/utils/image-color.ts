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
  scope?: "all" | "connected";
  seed?: { x: number; y: number };
};

export type ColorTransparencyOptions = {
  targetColor: RgbColor;
  tolerance: number;
  mode: "full" | "soft";
  reduceFringe: boolean;
};

const MAX_RGB_DISTANCE = Math.sqrt(255 * 255 * 3);

type HslColor = {
  h: number;
  s: number;
  l: number;
};

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

function rgbToHsl(color: RgbColor): HslColor {
  const red = color.r / 255;
  const green = color.g / 255;
  const blue = color.b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const lightness = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) return { h: 0, s: 0, l: lightness };

  const saturation = delta / (1 - Math.abs(2 * lightness - 1));
  let hue;
  if (max === red) hue = ((green - blue) / delta) % 6;
  else if (max === green) hue = (blue - red) / delta + 2;
  else hue = (red - green) / delta + 4;

  return { h: (hue * 60 + 360) % 360, s: saturation, l: lightness };
}

function hueDistance(first: number, second: number): number {
  const difference = Math.abs(first - second);
  return Math.min(difference, 360 - difference);
}

export function toleranceToThreshold(tolerance: number): number {
  const normalized = Math.max(0, Math.min(100, tolerance)) / 100;
  // A linear scale makes low values unexpectedly broad: 10 previously accepted
  // colors up to about 44 RGB units away. Keep the high end available while
  // making the first part of the slider useful for precise color selection.
  return MAX_RGB_DISTANCE * normalized ** 1.5;
}

export function isColorWithinTolerance(color: RgbColor, targetColor: RgbColor, tolerance: number): boolean {
  const normalizedTolerance = Math.max(0, Math.min(100, tolerance)) / 100;
  const threshold = toleranceToThreshold(tolerance);
  const distance = calculateColorDistance(color, targetColor);
  if (tolerance <= 0) return distance === 0;
  if (distance > threshold) return false;

  // RGB distance alone makes dark but unrelated colors (for example brown and
  // black) look close. For colors with a meaningful hue, also keep similar hue
  // and saturation. Neutral colors deliberately stay on RGB matching because
  // their hue is undefined or unstable.
  if (normalizedTolerance >= 0.8) return true;
  const targetHsl = rgbToHsl(targetColor);
  if (targetHsl.s < 0.18) return true;

  const candidateHsl = rgbToHsl(color);
  const minimumSaturation = Math.max(0.08, targetHsl.s - (0.18 + normalizedTolerance * 0.45));
  if (candidateHsl.s < minimumSaturation) return false;

  const maximumHueDistance = 12 + normalizedTolerance * 120;
  return hueDistance(candidateHsl.h, targetHsl.h) <= maximumHueDistance;
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

  const replacePixel = (index: number) => {
    const alpha = source.data[index + 3];
    if (alpha === 0) return;

    const color = { r: source.data[index], g: source.data[index + 1], b: source.data[index + 2] };
    if (!isColorWithinTolerance(color, options.targetColor, options.tolerance)) return;

    output.data[index] = options.replacementColor.r;
    output.data[index + 1] = options.replacementColor.g;
    output.data[index + 2] = options.replacementColor.b;
    output.data[index + 3] = alpha;
  };

  if (options.scope === "connected" && options.seed) {
    const seedX = Math.max(0, Math.min(source.width - 1, Math.round(options.seed.x)));
    const seedY = Math.max(0, Math.min(source.height - 1, Math.round(options.seed.y)));
    const pixelCount = source.width * source.height;
    const visited = new Uint8Array(pixelCount);
    const queue = new Int32Array(pixelCount);
    let head = 0;
    let tail = 0;

    const enqueue = (position: number) => {
      if (visited[position]) return;
      visited[position] = 1;
      queue[tail++] = position;
    };

    enqueue(seedY * source.width + seedX);
    while (head < tail) {
      const position = queue[head++];

      const index = position * 4;
      const color = { r: source.data[index], g: source.data[index + 1], b: source.data[index + 2] };
      if (source.data[index + 3] === 0 || !isColorWithinTolerance(color, options.targetColor, options.tolerance)) continue;

      replacePixel(index);
      const x = position % source.width;
      const y = Math.floor(position / source.width);
      if (x > 0) enqueue(position - 1);
      if (x < source.width - 1) enqueue(position + 1);
      if (y > 0) enqueue(position - source.width);
      if (y < source.height - 1) enqueue(position + source.width);
    }
    return output;
  }

  for (let index = 0; index < output.data.length; index += 4) {
    replacePixel(index);
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
