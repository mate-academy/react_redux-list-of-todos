import { createStore, AnyAction } from 'redux';

const initialState: GlobalState = {
  isLoaded: false,
  isLoading: false,
  todos: [],
};

// const loadReducer = (state = initialState, action: AnyAction): GlobalState => {
//   switch (action.type) {
//     case 'SET_IS_LOADED':
//       return {
//         ...state,
//         isLoaded: action.isLoaded,
//       };
//     case 'SET_IS_LOADING':
//       return {
//         ...state,
//         isLoading: action.isLoading,
//       };
//     case 'SET_TODOS':
//       return {
//         ...state,
//         todos: [...action.todos],
//       };
//     default:
//       return state;
//   }
// };

// const sortReducer = (state = initialState, action: AnyAction): GlobalState => {
//   switch (action.type) {
//     case 'SORT_BY_COMPLETED':
//       return {
//         ...state,
//         todos: [...state.todos
//           .sort((a, b) => {
//             return Number(a.completed) - Number(b.completed);
//           })],
//       };
//     case 'SORT_BY_USER':
//       return {
//         ...state,
//         todos: [...state.todos
//           .sort((a, b) => {
//             if (a.user && b.user) {
//               return a.user.name.localeCompare(b.user.name);
//             }

//             return 0;
//           })],
//       };
//     case 'SORT_BY_TITLE':
//       return {
//         ...state,
//         todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
//       };
//     case 'REVERSE_TODOS':
//       return {
//         ...state,
//         todos: [...state.todos.reverse()],
//       };
//     default:
//       return state;
//   }
// };

// const deleteReducer = (state = initialState, action: AnyAction): GlobalState => {
//   switch (action.type) {
//     case 'DELETE_TODO':
//       return {
//         ...state,
//         todos: [...state.todos.filter(todo => todo.id !== action.index)],
//       };
//     default:
//       return state;
//   }
// };

// const reducer = combineReducers({
//   loadReducer,
//   sortReducer,
//   deleteReducer,
// });

const reducer = (state = initialState, action: AnyAction): GlobalState => {
  switch (action.type) {
    case 'SET_IS_LOADED':
      return {
        ...state,
        isLoaded: action.isLoaded,
      };
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'SET_TODOS':
      return {
        ...state,
        todos: [...action.todos],
      };
    case 'SORT_BY_COMPLETED':
      return {
        ...state,
        todos: [...state.todos
          .sort((a, b) => {
            return Number(a.completed) - Number(b.completed);
          })],
      };
    case 'SORT_BY_USER':
      return {
        ...state,
        todos: [...state.todos
          .sort((a, b) => {
            if (a.user && b.user) {
              return a.user.name.localeCompare(b.user.name);
            }

            return 0;
          })],
      };
    case 'SORT_BY_TITLE':
      return {
        ...state,
        todos: [...state.todos].sort((a, b) => a.title.localeCompare(b.title)),
      };
    case 'REVERSE_TODOS':
      return {
        ...state,
        todos: [...state.todos.reverse()],
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: [...state.todos.filter(todo => todo.id !== action.index)],
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
