import {useEffect, MutableRefObject, useState} from "react";
import {TftEspiModule, TftEspiModuleLoader} from "./tft-espi-wrapper";

type ModuleCallback = (module:TftEspiModule) => void;

export const useTftEspi = (callback:ModuleCallback, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
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
          console.error(err);
        });
    }
  }, [canvasRef]);

  useEffect(() => {
    if (module) {
      callback(module);
    }
  }, [module, canvasRef]);
}
