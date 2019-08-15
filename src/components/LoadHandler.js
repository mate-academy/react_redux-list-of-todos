const SET_TODOS = 'setTodos';
const SET_LOADING = 'setLoading';

export const changeIsLoading = () => ({ type: SET_LOADING });
export const setTodos = value => ({ type: SET_TODOS, value });

const loadReducer = (state, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.value,
        isLoaded: true,
        isLoading: false,
      };

      case SET_LOADING:
        return {
          ...state,
          isLoading: true,
        }

    default:
      return state;
  }
}

export default loadReducer;
