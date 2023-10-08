type TFTSpi = {
  new(w: number, h: number): TFTSpi;
  init(): void;
  draw(): void;
};

export {TFTSpi};