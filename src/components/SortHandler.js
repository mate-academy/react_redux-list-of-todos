const SORT_BY_NAME = 'name';
const SORT_BY_TITLE = 'title';
const SORT_BY_ID = 'id';

export const sortByName = () => ({ type: SORT_BY_NAME });
export const sortByTitle = () => ({ type: SORT_BY_TITLE });
export const sortById = () => ({ type: SORT_BY_ID });

const sortReduser = (state, action) => {
  switch (action.type) {
    case SORT_BY_NAME:
      return state.sortField === SORT_BY_NAME
        ? {
          ...state,
          todos: [...state.todos].reverse(),
        }
        : {
          ...state,
          todos: [...state.todos]
            .sort((a, b) => a.user.name.localeCompare(b.user.name)),
          sortField: SORT_BY_NAME
        }

    case SORT_BY_TITLE:
        return state.sortField === SORT_BY_TITLE
          ? {
            ...state,
            todos: [...state.todos].reverse(),
          }
          : {
            ...state,
            todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
            sortField: SORT_BY_TITLE
          }

    case SORT_BY_ID:
      return state.sortField === SORT_BY_ID
        ? {
          ...state,
          todos: [...state.todos].reverse(),
        }
        : {
          ...state,
          todos: [...state.todos].sort((a, b) => a.id - b.id),
          sortField: SORT_BY_ID
        }

    default:
      return state;
  }
}

export default sortReduser;
