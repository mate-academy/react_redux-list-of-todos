import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoFilter } from './components/TodoFilter/TodoFilter';
import { TodoList } from './components/TodoList/TodoList';
import { TodoModal } from './components/TodoModal/TodoModal';
import { Loader } from './components/Loader/Loader';
import { useAppSelector } from './app/hooks';

export const App = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todosReducer);

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
