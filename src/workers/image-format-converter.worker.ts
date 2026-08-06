type ConvertRequest = {
  id: string;
  type: "convert";
  buffer: ArrayBuffer;
  mimeType: string;
  outputType: string;
  quality: number;
  backgroundColor: string;
};

const toRgb = (hex: string) => {
  const clean = /^#[0-9a-f]{6}$/i.test(hex) ? hex.slice(1) : "ffffff";
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16),
  };
};

const encodeBmp = (imageData: ImageData, backgroundColor: string) => {
  const { width, height, data } = imageData;
  const rowSize = Math.ceil((width * 3) / 4) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;
  const output = new Uint8Array(fileSize);
  const view = new DataView(output.buffer);
  const background = toRgb(backgroundColor);

  output[0] = 0x42;
  output[1] = 0x4d;
  view.setUint32(2, fileSize, true);
  view.setUint32(10, 54, true);
  view.setUint32(14, 40, true);
  view.setInt32(18, width, true);
  view.setInt32(22, height, true);
  view.setUint16(26, 1, true);
  view.setUint16(28, 24, true);
  view.setUint32(34, pixelArraySize, true);

  for (let y = 0; y < height; y += 1) {
    const sourceY = height - 1 - y;
    const rowOffset = 54 + y * rowSize;
    for (let x = 0; x < width; x += 1) {
      const sourceOffset = (sourceY * width + x) * 4;
      const targetOffset = rowOffset + x * 3;
      const alpha = data[sourceOffset + 3] / 255;
      const r = Math.round(data[sourceOffset] * alpha + background.r * (1 - alpha));
      const g = Math.round(data[sourceOffset + 1] * alpha + background.g * (1 - alpha));
      const b = Math.round(data[sourceOffset + 2] * alpha + background.b * (1 - alpha));
      output[targetOffset] = b;
      output[targetOffset + 1] = g;
      output[targetOffset + 2] = r;
    }
  }

  return output.buffer;
};

self.onmessage = async (event: MessageEvent<ConvertRequest>) => {
  const request = event.data;
  if (request.type !== "convert") return;

  try {
    if (typeof createImageBitmap !== "function" || typeof OffscreenCanvas === "undefined") {
      throw new Error("WORKER_UNSUPPORTED");
    }

    const sourceBlob = new Blob([request.buffer], { type: request.mimeType });
    const image = await createImageBitmap(sourceBlob, { imageOrientation: "from-image" });
    const canvas = new OffscreenCanvas(image.width, image.height);
    const context = canvas.getContext("2d", { willReadFrequently: request.outputType === "image/bmp" });
    if (!context) throw new Error("CANVAS_UNSUPPORTED");

    if (request.outputType === "image/jpeg" || request.outputType === "image/bmp") {
      context.fillStyle = request.backgroundColor || "#ffffff";
      context.fillRect(0, 0, image.width, image.height);
    }
    context.drawImage(image, 0, 0);
    image.close();

    let outputBuffer: ArrayBuffer;
    let outputType = request.outputType;
    if (request.outputType === "image/bmp") {
      outputBuffer = encodeBmp(context.getImageData(0, 0, canvas.width, canvas.height), request.backgroundColor || "#ffffff");
    } else {
      const blob = await canvas.convertToBlob({ type: request.outputType, quality: request.quality });
      outputType = blob.type || request.outputType;
      outputBuffer = await blob.arrayBuffer();
    }

    self.postMessage(
      { id: request.id, ok: true, buffer: outputBuffer, width: canvas.width, height: canvas.height, outputType },
      [outputBuffer],
    );
  } catch (error) {
    self.postMessage({
      id: request.id,
      ok: false,
      error: error instanceof Error ? error.message : "CONVERT_FAILED",
    });
  }
};
