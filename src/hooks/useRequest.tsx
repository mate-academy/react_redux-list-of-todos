import { useEffect, useState } from 'react';

type Request<T> = () => Promise<T>;
type Return<T> = [T | null, boolean, boolean];

export function useRequest<T>(
  request: Request<T>,
  deps: unknown[] = [],
  initialData: T | null = null,
): Return<T> {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    request()
      .then(newData => setData(newData))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, deps);

  return [data, isLoading, error];
}
