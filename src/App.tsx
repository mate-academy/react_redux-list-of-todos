/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos as uploadFromAPITodos, getUser } from './api';
import { Todo } from './types/Todo';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { Status } from './types/Status';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as currTodoActions } from './features/currentTodo';
import { actions as getTodosActions } from './features/todos';

function getFilteredTodos(
  todosFromServer: Todo[],
  status: Status,
  query: string,
) {
  let filteredTodos = todosFromServer;

  switch (status) {
    case 'active':
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case 'completed':
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    default:
      filteredTodos = [...filteredTodos];
  }

  const lowerQuery = query.toLowerCase();

  filteredTodos = filteredTodos.filter(
    todo => todo.title.toLowerCase().includes(lowerQuery),
  );

  return filteredTodos;
}

export const App: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();

  const getTodos = (arrOfTodos: Todo[]) => dispatch(getTodosActions.getTodos(arrOfTodos));
  const setTodo = (todo: Todo) => dispatch(currTodoActions.setTodo(todo));
  const removeTodo = () => dispatch(currTodoActions.removeTodo());

  useEffect(() => {
    setFilteredTodos(getFilteredTodos(todos, status, query));
  }, [status, query, todos]);

  useEffect(() => {
    uploadFromAPITodos()
      .then((response: Todo[]) => getTodos(response));
  }, []);

  const handleClick = async (todo: Todo) => {
    setTodo(todo);

    const currentUser = await getUser(todo.userId);

    setUser(currentUser);
  };

  const closeWindow = () => {
    removeTodo();
  };

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
              {todos.length === 0
                ? (
                  <Loader />
                ) : (
                  <TodoList
                    todos={filteredTodos}
                    selectedId={selectedTodo?.id}
                    handleClick={handleClick}
                  />
                )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          user={user}
          todo={selectedTodo}
          closeWindow={closeWindow}
        />
      )}
    </>
  );
};
