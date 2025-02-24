import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useSelector } from 'react-redux';
import { Todo } from './types/Todo';

export const App = () => {
  const currentTodo = useSelector(
    (state: { currentTodo: Todo | null }) => state.currentTodo,
  );

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
              <TodoList />
            </div>
          </div>
        </div>
      </div>
      <Loader />
      {currentTodo && <TodoModal todo={currentTodo} />}
    </>
  );
};
