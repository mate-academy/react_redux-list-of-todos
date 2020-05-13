import { combineReducers } from 'redux';

import { isLoading } from './isLoading';
import { dataWasLoaded } from './dataWasLoaded';
import { sortOption } from './sortOption';
import { todos } from './todos';

export const reducers = combineReducers({
  isLoading,
  dataWasLoaded,
  sortOption,
  todos,
});
