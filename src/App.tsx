import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action, selectors } from './store';
import { Loader } from './components/Loader';
import { TodoList } from './components/TodoList';
import { TodoModal } from './components/TodoModal';
import { TodoFilter } from './components/TodoFilter';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.getLoadingInfo);
  const selectedTodoID = useSelector(selectors.getSelectedTodo);

  useEffect(() => {
    dispatch(action.uploadTodos());
  }, []);

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
              {isLoading
                ? (<Loader />)
                : (
                  <TodoList />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodoID && (
        <TodoModal />
      )}
    </>
  );
};
