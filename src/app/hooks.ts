import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from './store';

export const useAppSelector = useSelector.withTypes<RootState>();

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
