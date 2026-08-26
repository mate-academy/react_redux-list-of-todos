import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* function useDispatch() {
  const store = useContext(ReactReduxContext).store; // дістає store з Provider
  return store.dispatch;

  тобто export const useAppDispatch = () => useDispatch<AppDispatch>(); - ми експортуємо наший Dispatch
} */

/* useSelector - так само, готова реалізація того useState + useEffect + store.subscribe,
    який ми писали руками, тільки з оптимізаціями (порівнює старий/новий результат селектора,
    щоб не перемальовувати зайвий раз).


    useAppSelector - дає тобі значення зі стану (щоб читати дані, підписавшись на зміни)

} */
