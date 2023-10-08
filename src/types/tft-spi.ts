type TFTSpi = {
  new(w: number, h: number, canvasId?: string): TFTSpi;
  init(): void;
  draw(): void;
  drawLine(x0: number, y0: number, x1: number, y1: number, color: number): void;
};

export {TFTSpi};
