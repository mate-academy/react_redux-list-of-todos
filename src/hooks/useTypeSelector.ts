import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootSate } from '../store';

export const useTypedSelector: TypedUseSelectorHook<RootSate> = useSelector;
