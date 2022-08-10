
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos, getUser } from './api';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { useEffect, useState } from 'react';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToShow, setTodosToShow] = useState(todos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getTodos().then((currentTodos) => {
      setTodos(currentTodos);
      setTodosToShow(currentTodos);
    });

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setSelectedUser);
    }
  }, [selectedTodo]);

  return (
    <div className="App">
      <h1>Redux list of todos</h1>
      <>
        <div className="section">
          <div className="container">
            <div className="box">
              <h1 className="title">Todos:</h1>

              <div className="block">
                <TodoFilter
                  todos={todos}
                  onSettingTodo={setTodosToShow}
                />
              </div>

              <div className="block">
                {todos.length === 0
                  ? <Loader />
                  : (
                    <TodoList
                      todos={todosToShow}
                      onSetSelectedTodo={setSelectedTodo}
                      onSettingModal={setModal}
                    />
                  )}
              </div>
            </div>
          </div>
        </div>

        {modal && (
          <TodoModal
            selectedTodo={selectedTodo}
            selectedUser={selectedUser}
            onSelectTodo={setSelectedTodo}
            onSettingSelectedUser={setSelectedUser}
            onSettingModal={setModal}
          />
        )}
      </>
    </div>
  );
};
