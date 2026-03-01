import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
