import {useEffect, useState} from "react";

import {ModuleConfig} from "./module-config";

export type ModuleLoader<T> = (config: ModuleConfig) => Promise<T>;

export const useModule = <T>(loader: ModuleLoader<T>, config: ModuleConfig) => {
  const [module, setModule] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loader(config)
      .then(resolvedModule => {
        setModule(resolvedModule);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [loader]);

  return {module, loading, error};
}
