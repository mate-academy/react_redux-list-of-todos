import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './app/store';

export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
