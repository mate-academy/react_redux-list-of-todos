import { Todo } from '../types/Todo';

enum Type {
  addTodos = 'todos/ADD',
}

type AddTodos = { type: Type.addTodos, payload: Todo[] };

const addTodos = (todos: Todo[]): AddTodos => (
  { type: Type.addTodos, payload: todos }
);

export const actions = { addTodos };

const todosReducer = (todos: Todo[] = [], action: AddTodos): Todo[] => {
  if (action.type === Type.addTodos) {
    return action.payload;
  }

  return todos;
};

export default todosReducer;


// useEffect(() => {
//   const filteredByTitle = (todos: Todo[]) => {
//     return todos.filter((todo) =>
//       todo.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   };

//   getTodos().then((todosData) => {
//     if (searchQuery) {
//       const filteredData = filteredByTitle(todosData);

//       setTodos(filteredData);
//     } else {
//       setTodos(todosData);
//     }
//   });
// }, [searchQuery, setTodos]);
// const getFilteredTodos = async (value: string) => {
//   let filteredTodos: Todo[] = [];

//   switch (value) {
//     case FilterBy.ALL:
//       filteredTodos = await getTodos();
//       break;
//     case FilterBy.ACTIVE:
//       filteredTodos = (await getTodos()).filter((todo) => !todo.completed);
//       break;
//     case FilterBy.COMPLETED:
//       filteredTodos = (await getTodos()).filter((todo) => todo.completed);
//       break;
//     default:
//       break;
//   }

//   setTodos(filteredTodos);
// };
