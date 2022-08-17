import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootState } from '.';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
