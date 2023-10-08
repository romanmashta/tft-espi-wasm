// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ModuleImpl from './tft-espi-wasm'
import type {TFTSpi} from "./types/tft-spi";
import type {ModuleLoader} from "./module-hooks";

export type ModuleConfig = {
  canvas?: HTMLCanvasElement;
}

export type TftEspiModule = ModuleConfig & {
  TFTSpi: TFTSpi;
}

export const TftEspiModuleLoader: ModuleLoader<TftEspiModule> = ModuleImpl as ModuleLoader<TftEspiModule>;
