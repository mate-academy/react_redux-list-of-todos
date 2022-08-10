import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos, getUser } from './api';
import { User } from './types/User';

import './App.scss';
import { useAppSelector } from './store';
import { actions as loadingActions } from './store/loading';
import { actions as todosActions } from './store/todos';
import { actions as currentTodoActions } from './store/currentTodo';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(state => state.loading);
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isModalVisible, setModalVisbility] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    getTodos()
      .then(todosFromServer => {
        dispatch(todosActions.setTodos(todosFromServer));
        setVisibleTodos(todosFromServer);
      })
      .finally(() => dispatch(loadingActions.finishLoading()));
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(currentUser => setUser(currentUser));
    }
  }, [isModalVisible]);

  const handleModalClosing = () => {
    dispatch(currentTodoActions.resetTodo());
    setUser(null);
    setModalVisbility(false);
  };

  return (
    <div className="App">
      {isLoading
        ? <Loader />
        : (
          <div className="section">
            <div className="container">
              <div className="box">
                <h1 className="title">Redux list of todos:</h1>

                <div className="block">
                  <TodoFilter
                    todos={todos}
                    onSetVisibleTodos={setVisibleTodos}
                  />
                </div>

                <div className="block">
                  <TodoList
                    todos={visibleTodos}
                    onSetModalVisibility={setModalVisbility}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      {isModalVisible && (
        <TodoModal
          selectedTodo={selectedTodo}
          currentUser={user}
          onModalClosing={handleModalClosing}
        />
      )}
    </div>
  );
};
