import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
