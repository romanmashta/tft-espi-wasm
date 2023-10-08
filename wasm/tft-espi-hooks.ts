import {useEffect, MutableRefObject, useState} from "react";
import {TftEspiModule, TftEspiModuleLoader} from "./tft-espi-wrapper";

export const useTftEspi = (canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
  const [module, setModule] = useState<TftEspiModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(canvasRef.current && TftEspiModuleLoader){
      const config = {
        canvas: canvasRef.current
      };
      TftEspiModuleLoader(config)
        .then(resolvedModule => {
          setModule(resolvedModule);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [canvasRef]);

  useEffect(() => {
    if (module) {
      const tft = new module.TFTSpi(320, 240, canvasRef.current?.id);
      tft.init();
      tft.draw();
    }
  }, [module, canvasRef]);
}