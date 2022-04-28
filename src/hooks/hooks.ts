import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDipatch, RootState } from '../store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDipatch>();
