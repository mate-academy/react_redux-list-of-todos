// src/hooks.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

// Правильний типізований хук селектора
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
