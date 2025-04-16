import { useEffect, useState } from 'react';

export function useFetch<T>(
  fetchFunc: () => Promise<T>,
  defaultValue: T,
  dependency: number = 0,
) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!fetchFunc) {
      setErrorMessage('No fetch function provided');

      return;
    }

    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await fetchFunc();

        setData(result);
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : 'An unexpected error occurred',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchFunc, dependency]);

  return { data, isLoading, errorMessage };
}
