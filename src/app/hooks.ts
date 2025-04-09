import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store';

export const useAppSelected: TypedUseSelectorHook<RootState> = useSelector;
