import {
  TypedUseSelectorHook,
  UseDispatch,
  useDispatch,
  useSelector,
} from 'react-redux';
import { AppDispatch, RootState } from './store';

export const useAppDispatch: UseDispatch<AppDispatch> = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
