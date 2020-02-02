import { createSelector } from 'reselect';

const rootSelector = state => state;

export const selectList = createSelector(
  rootSelector,
  ({ preparedTodos }) => preparedTodos
);

export const selectListError = createSelector(
  rootSelector,
  ({ error }) => error
);

export const selectIsLoading = createSelector(
  rootSelector,
  ({ isLoading }) => isLoading
);
