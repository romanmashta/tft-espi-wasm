import {useEffect, useState} from "react";

export type ModuleLoader<T> = () => Promise<T>;

export const useModule = <T>(loader: ModuleLoader<T>) => {
  const [module, setModule] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loader()
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
