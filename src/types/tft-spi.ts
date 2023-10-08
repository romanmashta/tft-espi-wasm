export type TFTSpi = {
  new(w: number, h: number, canvasId?: string): TFTSpi;
  init(): void;
  draw(): void;
  drawLine(x0: number, y0: number, x1: number, y1: number, color: number): void;
  drawSmoothRoundRect(x: number, y: number, w: number, h: number, r: number, color: number): void;
  drawString(str: string, x: number, y: number, font: Font): void;
  setFont(font: Font): void;
};

export enum Font {
  GFXFF = 1,
  GLCD = 0,
  FONT2 = 2,
  FONT4 = 4,
  FONT6 = 6,
  FONT7 = 7,
  FONT8 = 8,
}

