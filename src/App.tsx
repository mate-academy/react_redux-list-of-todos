import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useTodos } from './hooks/useTodos';
import { useAppSelector } from './app/hooks';
import { selectFilteredTodos } from './features/selectors/todosSelectors';

export const App = () => {
  const { isLoading: isTodoLoading, errorMessage } = useTodos();
  const todos = useAppSelector(selectFilteredTodos);

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
              {isTodoLoading ? (
                <Loader />
              ) : (
                <TodoList todos={todos} errorMessage={errorMessage} />
              )}
            </div>
          </div>
        </div>
      </div>

      <TodoModal />
    </>
  );
};
