import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../app/store'; // ✅ Ensure the path to `store.ts` is correct

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
