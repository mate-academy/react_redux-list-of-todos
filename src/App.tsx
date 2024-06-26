import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useSelector } from 'react-redux';
import { Todo } from './types/Todo';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader/Loader';

export const App = () => {
  const currentTodo = useSelector((state: Todo) => state.currentTodoReducer);
  const todos = useSelector((state: any) => state.todosReducer);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {currentTodo && <TodoModal />}
    </>
  );
};
