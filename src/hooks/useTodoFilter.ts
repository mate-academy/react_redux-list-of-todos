import { useDispatch } from 'react-redux';
import { useAppSelector } from './useAppSelector';

export const useTodoFilter = () => {
  const dispatch = useDispatch();
  const { query } = useAppSelector(state => state.filter);

  return {
    dispatch,
    query,
  };
};
