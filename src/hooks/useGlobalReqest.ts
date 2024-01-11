import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootAction, RootState } from '../app/store';

type Request<T> = () => Promise<T>;
type ActionCreator<T> = (data: T) => RootAction;
type Selector<T> = (state: RootState) => T;
type Return<T> = [T, boolean, boolean];

export function useGlobalRequest<T>(
  request: Request<T>,
  actionCreator: ActionCreator<T>,
  selector: Selector<T>,
  deps: unknown[] = [],
): Return<T> {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selector);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    request()
      .then(newData => dispatch(actionCreator(newData)))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, deps);

  return [data, isLoading, error];
}
