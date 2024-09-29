import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppDispatch, RootState} from "./app/store";
import {useDispatch} from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState>  = useSelector;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
