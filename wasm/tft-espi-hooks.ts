import {useEffect, MutableRefObject} from "react";
import {useModule} from "./module-hooks";
import {TftEspiModuleLoader} from "./tft-espi-wrapper";

export const useTftEspi = (canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
  const {module} = useModule(TftEspiModuleLoader);

  useEffect(() => {
    if (module && canvasRef.current) {
      module.canvas = canvasRef.current;
      const tft = new module.TFTSpi(320, 240);
      tft.init();
      tft.draw();
    }
  }, [module, canvasRef]);
}