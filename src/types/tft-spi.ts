type TFTSpi = {
  new(w: number, h: number, canvasId?: string): TFTSpi;
  init(): void;
  draw(): void;
};

export {TFTSpi};