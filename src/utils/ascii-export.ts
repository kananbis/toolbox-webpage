import type { AsciiResult } from "@/types/image-ascii";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function buildAsciiFilename(originalName: string, extension: "txt" | "png"): string {
  const baseName = originalName.replace(/\.[^.]+$/, "") || "image";
  return `${baseName}-ascii-art.${extension}`;
}

export function createAsciiTextBlob(result: AsciiResult): Blob {
  return new Blob([result.text], { type: "text/plain;charset=utf-8" });
}

export function createAsciiHtml(result: AsciiResult, colorMode: boolean, textColor: string, backgroundColor: string): string {
  const baseStyle = `font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;white-space:pre;line-height:1;letter-spacing:0;background:${backgroundColor};color:${textColor};`;

  if (!colorMode) {
    return `<pre style="${baseStyle}">${escapeHtml(result.text)}</pre>`;
  }

  const lines = result.cells.map((row) =>
    row.map((cell) => `<span style="color:${cell.color}">${escapeHtml(cell.char)}</span>`).join(""),
  );

  return `<pre style="${baseStyle}">${lines.join("\n")}</pre>`;
}

export function renderAsciiToCanvas(
  result: AsciiResult,
  options: {
    colorMode: boolean;
    fontSize: number;
    padding: number;
    textColor: string;
    backgroundColor: string;
    transparentBackground: boolean;
    scale: number;
  },
): HTMLCanvasElement {
  const measureCanvas = document.createElement("canvas");
  const measureContext = measureCanvas.getContext("2d");
  if (!measureContext) throw new Error("Canvas context could not be created.");

  const fontSize = Math.max(6, Math.min(48, options.fontSize));
  const padding = Math.max(0, Math.min(120, options.padding));
  const scale = Math.max(1, Math.min(4, options.scale));
  const font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
  measureContext.font = font;
  const charWidth = Math.max(1, measureContext.measureText("M").width);
  const lineHeight = fontSize;

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil((result.width * charWidth + padding * 2) * scale);
  canvas.height = Math.ceil((result.height * lineHeight + padding * 2) * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas context could not be created.");

  context.scale(scale, scale);
  if (!options.transparentBackground) {
    context.fillStyle = options.backgroundColor;
    context.fillRect(0, 0, canvas.width / scale, canvas.height / scale);
  }

  context.font = font;
  context.textBaseline = "top";

  for (let y = 0; y < result.height; y += 1) {
    for (let x = 0; x < result.width; x += 1) {
      const cell = result.cells[y]?.[x];
      if (!cell || cell.char === " ") continue;
      context.fillStyle = options.colorMode ? cell.color : options.textColor;
      context.fillText(cell.char, padding + x * charWidth, padding + y * lineHeight);
    }
  }

  return canvas;
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("PNG export failed."));
    }, "image/png");
  });
}
