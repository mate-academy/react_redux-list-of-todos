import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import * as store from '../../store/actions';
import {
  deleteTodo,
  getTodos,
  getUser,
} from '../../api/api';
import { ShowUser } from '../ShowUser/ShowUser';
import { getFilteringTodos, showUserSelector } from '../../store/selectors';
import { Todo } from '../../react-app-env';

export const TodosList: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showTodos, setShowTodos] = useState('');
  const dispatch = useDispatch();
  const filteringTodos = useSelector(getFilteringTodos(query));
  const user = useSelector(showUserSelector);

  const filterForTodo = (allTodos: Todo[]): Todo[] => {
    if (showTodos === 'active') {
      return allTodos.filter(todo => todo.completed === false);
    }

    if (showTodos === 'completed') {
      return allTodos.filter(todo => todo.completed === true);
    }

    return allTodos;
  };

  const loadTodos = async () => {
    const todosFromServer = await getTodos();

    dispatch(store.actionTodos(todosFromServer));
  };

  const userFromServer = async (userId: number) => {
    const userFS = await getUser(userId);

    dispatch(store.showUserFromServer(userFS));
  };

  const setDeleting = async (id: number) => {
    await deleteTodo(id);
    await dispatch(store.deleteTodoAction(id));
  };

  // const setAdd = async () => {
  //   await addSomeTodo();
  //   await loadTodos();
  // };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className="content columns">
      <div className="column is-three-fifths m-4">
        {/* <button
          className="button"
          onClick={() => setAdd()}
          type="button"
        >
          Add Some Todos
        </button> */}
        <h1 className="m-4">Redux list of todos</h1>
        <input
          type="text"
          className="column input is-three-thirds m-4"
          placeholder="Search by title"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <select
          name="user"
          id="user"
          className="select"
          value={showTodos}
          onChange={(event) => setShowTodos(event.target.value)}
        >
          <option value="">Show all</option>
          <option value="active">Show active</option>
          <option value="completed">Show completed</option>
        </select>
        <ul>
          {filterForTodo(filteringTodos).map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'box',
                'column',
                'is-flex',
                'is-three-thirds',
                'is-justify-content-space-between',
                'has-background-success-light',

                {
                  'has-background-danger-light': !todo.completed,
                },
              )}
            >
              <input type="checkbox" readOnly checked={todo.completed} />
              <p>{todo.title}</p>
              <div className="button_box">
                <button
                  type="button"
                  className="button is-danger"
                  onClick={() => setDeleting(todo.id)}
                >
                  delete
                </button>
                <button
                  type="button"
                  className={classNames(
                    'button',
                    {
                      'is-info': user?.id === todo.userId,
                    },
                  )}
                  onClick={() => (userFromServer(todo.userId))}
                >
                  {`User - ${todo.userId}`}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ShowUser />
    </div>
  );
};
