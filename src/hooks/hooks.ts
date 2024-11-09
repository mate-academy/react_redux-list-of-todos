import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../app/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
