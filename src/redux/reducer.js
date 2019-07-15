import { LOAD_ITEMS, DISPLAY, SORT_TABLE, REMOVE_ITEM, CLEAR_ALL } from "./action";

const initialState = {
  data: null,
  selectedTodo: null,
  requested: false
};

export function todoApp(state = initialState, action) {
  switch(action.type) {
    case LOAD_ITEMS:
      return {
        ...state,
        requested: true
      };
    case DISPLAY:
      const [todos, users] = action.data;
      return {
        ...state,
        data: todos.map(todo => {
          return {
            ...todo,
            user: users.find(user => user.id === todo.userId)
          };
        })
      };
    case SORT_TABLE: 
      const copyTodos = [...state.data];
        switch(action.value) {
          case 'author':
            copyTodos.sort((a, b) => a.user.name.localeCompare(b.user.name));
            break;
          case 'title': 
            copyTodos.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'completed':
            copyTodos.sort((a, b) => b.completed - a.completed);
            break;
          default:
        }
      return {
        ...state,
        data: copyTodos
      }
    case REMOVE_ITEM: 
      return {
        ...state,
        data: state.data.filter(todo => todo.id !== action.id)
      };
    case CLEAR_ALL: {
      const deletedList = [...state.data]
      deletedList.length = 0;
      return {
        ...state,
        data: deletedList
      }
    }
    default:
      return state;
  };
};

