export type TFTSpi = {
  new(w: number, h: number, canvasId?: string): TFTSpi;
  init(): void;
  draw(): void;
  fillScreen(color: number): void;
  fillSprite(color: number): void;
  drawLine(x0: number, y0: number, x1: number, y1: number, color: number): void;
  drawRoundRect(x: number, y: number, w: number, h: number, r: number, color: number): void;
  drawString(str: string, x: number, y: number): void;
  setFont(font: Font): void;

  setTextDatum(datum: number): void;
  loadFont(font: Uint8Array): void;
  setTextColor(color: number, background: number): void;
  unloadFont(): void;
  setSwapBytes(swap: number): void;
  delete(): void;
};

export type TFTSprite = TFTSpi & {
  new(spi: TFTSpi): TFTSprite;
  fillSprite(color: number): void;
  createSprite(w: number, h: number, frames?: number): void;
  fillScreen(color: number): void;
  drawLine(x0: number, y0: number, x1: number, y1: number, color: number): void;
  drawRoundRect(x: number, y: number, w: number, h: number, r: number, color: number): void;
  drawString(str: string, x: number, y: number, font: Font): void;
  setFont(font: Font): void;
  delete(): void;
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

export const TFT_BLACK = 0x0000;
export const TFT_WHITE = 0xFFFF;
