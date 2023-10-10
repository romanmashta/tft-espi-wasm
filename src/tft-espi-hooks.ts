import {useEffect, MutableRefObject, useState} from "react";
import Module from "./tft-espi-wasm";
import {ModuleConfig} from "./module-config";

type ModuleCallback = (module:typeof Module) => void;

export const useTftEspi = (callback:ModuleCallback, canvasRef: MutableRefObject<HTMLCanvasElement | null>) => {
  const [module, setModule] = useState<typeof Module | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(canvasRef.current){
      const config = {
        canvas: canvasRef.current
      };
      Module(config)
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
