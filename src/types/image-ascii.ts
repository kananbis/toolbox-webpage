export type AsciiMode = "monochrome" | "color";

export type TransparencyMode = "space" | "composite" | "ignore";

export type PreviewBackgroundMode = "white" | "black" | "custom" | "checkerboard";

export type AsciiCell = {
  char: string;
  color: string;
  alpha: number;
};

export type AsciiSettings = {
  mode: AsciiMode;
  outputWidth: number;
  characterAspectRatio: number;
  characters: string;
  brightness: number;
  contrast: number;
  invertImage: boolean;
  reverseCharacters: boolean;
  transparencyMode: TransparencyMode;
  alphaThreshold: number;
  backgroundColor: string;
  textColor: string;
};

export type AsciiResult = {
  width: number;
  height: number;
  text: string;
  cells: AsciiCell[][];
};
