import { useEffect, useState } from 'react';

type Fetcher<T> = () => Promise<T>;

const useFetch = <T>(fetcher: Fetcher<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetcher()
      .then(response => {
        setData(response as T);
      })
      .catch(error => {
        setIsError(true);
        setErrorMessage(error?.message ?? 'Unknown error');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    data,
    isLoading,
    isError,
    errorMessage,
  };
};

export default useFetch;
