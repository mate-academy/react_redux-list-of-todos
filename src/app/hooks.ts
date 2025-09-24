import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
