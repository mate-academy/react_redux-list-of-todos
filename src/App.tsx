import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { RootState } from './app/store';
import { addTodos } from './features/todos';
import { getTodos } from './api';
import { filteredList } from './utils/filter';
import { Todo } from './types/Todo';

export const App = () => {
  const [todosLoaded, setTodosLoaded] = useState(false);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const todos = useSelector((state: RootState) => state.todos);
  const status = useSelector((state: RootState) => state.filter.status);
  const query = useSelector((state: RootState) => state.filter.query);

  const filteredTodos = filteredList(status, query, todos);

  useEffect(() => {
    getTodos().then(results => {
      dispatch(addTodos(results));
      setTodosLoaded(true);
    });
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
              {!todosLoaded ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  visible={modalVisible}
                  onTodoSelect={setTodo}
                  onModalToggle={setModalVisible}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {modalVisible && todo && (
        <TodoModal todo={todo} onModalToggle={setModalVisible} />
      )}
    </>
  );
};
