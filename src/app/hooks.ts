import { useSelector } from 'react-redux';
import { RootState } from './store';
import { TypedUseSelectorHook } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
