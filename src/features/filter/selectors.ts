import { RootState } from '../../app/store';

export const getFilter = (state: RootState) => {
  return state.filter;
};
