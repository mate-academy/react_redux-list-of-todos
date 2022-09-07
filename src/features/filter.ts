const ALL_TODOS = 'ALL_TODOS';

export const actions = {
  allTodos: () => ({ type: ALL_TODOS }),
};

const filterReducer = () => {
  return {
    query: '',
    status: 'all',
  };
};

export default filterReducer;
