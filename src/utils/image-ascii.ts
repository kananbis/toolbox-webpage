import type { AsciiCell, AsciiResult, AsciiSettings } from "@/types/image-ascii";

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const parseHex = (hex: string) => {
  const normalized = hex.trim().replace(/^#/, "");
  const expanded = /^[0-9a-fA-F]{3}$/.test(normalized)
    ? normalized.split("").map((char) => `${char}${char}`).join("")
    : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) return { r: 255, g: 255, b: 255 };

  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
  };
};

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0")).join("")}`;

const applyBrightnessContrast = (value: number, brightness: number, contrast: number) => {
  const brightened = value + brightness * 2.55;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  return clamp(factor * (brightened - 128) + 128, 0, 255);
};

const relativeLuminance = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

function compositeOnBackground(r: number, g: number, b: number, alpha: number, backgroundColor: string) {
  const bg = parseHex(backgroundColor);
  const ratio = alpha / 255;
  return {
    r: r * ratio + bg.r * (1 - ratio),
    g: g * ratio + bg.g * (1 - ratio),
    b: b * ratio + bg.b * (1 - ratio),
  };
}

export function getAsciiCharacterSets() {
  return {
    basic: "@%#*+=-:. ",
    detailed: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`. ",
    simple: "#*+-. ",
    blocks: "█▓▒░ ",
    numbers: "9876543210 ",
  };
}

export function normalizeAsciiCharacters(value: string): string {
  return value.length >= 2 ? value : "@ ";
}

export function createAsciiArtFromImage(image: HTMLImageElement | ImageBitmap, settings: AsciiSettings): AsciiResult {
  const outputWidth = Math.round(clamp(settings.outputWidth, 20, 200));
  const sourceWidth = "naturalWidth" in image ? image.naturalWidth : image.width;
  const sourceHeight = "naturalHeight" in image ? image.naturalHeight : image.height;
  const outputHeight = Math.max(1, Math.round((sourceHeight / sourceWidth) * outputWidth * settings.characterAspectRatio));
  const sampleCanvas = document.createElement("canvas");
  sampleCanvas.width = outputWidth;
  sampleCanvas.height = outputHeight;
  const context = sampleCanvas.getContext("2d", { willReadFrequently: true });

  if (!context) throw new Error("Canvas context could not be created.");

  context.clearRect(0, 0, outputWidth, outputHeight);
  context.imageSmoothingEnabled = true;
  context.drawImage(image, 0, 0, outputWidth, outputHeight);

  const imageData = context.getImageData(0, 0, outputWidth, outputHeight);
  const characters = normalizeAsciiCharacters(settings.characters);
  const rows: string[] = [];
  const cells: AsciiCell[][] = [];

  for (let y = 0; y < outputHeight; y += 1) {
    let row = "";
    const cellRow: AsciiCell[] = [];

    for (let x = 0; x < outputWidth; x += 1) {
      const index = (y * outputWidth + x) * 4;
      const alpha = imageData.data[index + 3];
      let r = imageData.data[index];
      let g = imageData.data[index + 1];
      let b = imageData.data[index + 2];

      if (settings.transparencyMode === "space" && alpha <= settings.alphaThreshold) {
        row += " ";
        cellRow.push({ char: " ", color: settings.textColor, alpha: 0 });
        continue;
      }

      if (settings.transparencyMode === "composite" && alpha < 255) {
        const composited = compositeOnBackground(r, g, b, alpha, settings.backgroundColor);
        r = composited.r;
        g = composited.g;
        b = composited.b;
      }

      let brightness = relativeLuminance(r, g, b);
      brightness = applyBrightnessContrast(brightness, settings.brightness, settings.contrast);
      if (settings.invertImage) brightness = 255 - brightness;

      let charIndex = Math.floor((brightness / 255) * (characters.length - 1));
      if (settings.reverseCharacters) charIndex = characters.length - 1 - charIndex;
      const char = characters[clamp(charIndex, 0, characters.length - 1)] ?? " ";

      row += char;
      cellRow.push({
        char,
        color: settings.mode === "color" ? toHex(r, g, b) : settings.textColor,
        alpha,
      });
    }

    rows.push(row);
    cells.push(cellRow);
  }

  return {
    width: outputWidth,
    height: outputHeight,
    text: rows.join("\n"),
    cells,
  };
}
