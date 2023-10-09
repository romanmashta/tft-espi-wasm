// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ModuleImpl from './tft-espi-wasm'
import type {TFTSpi} from "./types/tft-spi";
import type {ModuleLoader} from "./module-hooks";
import {TFTSprite} from "./types/tft-spi";

export type ModuleConfig = {
  canvas?: HTMLCanvasElement;
}

export type TftEspiModule = ModuleConfig & {
  TFTSpi: TFTSpi;
  TFTSprite: TFTSprite;
}

export const TftEspiModuleLoader: ModuleLoader<TftEspiModule> = ModuleImpl as ModuleLoader<TftEspiModule>;
