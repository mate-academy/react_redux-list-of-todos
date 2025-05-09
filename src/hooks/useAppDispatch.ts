import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
