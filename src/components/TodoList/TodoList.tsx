import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUserById, removeTodo } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import { Todo } from '../../react-app-env';

type Props = {
  userId: number,
  setUserId: (id: number) => void
};

export const TodoList: React.FC<Props> = ({ userId, setUserId }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [completedTodos, setCompletedTodos] = useState('all');

  const todos = useSelector(getTodosSelector);

  const filteredTitleTodos = todos.filter(todo => todo.title.includes(query));

  const filteredCompletedTodos = (allTodos: Todo[]) => {
    switch (completedTodos) {
      case 'active': {
        return allTodos.filter(todo => todo.completed === false);
      }

      case 'completed': {
        return allTodos.filter(todo => todo.completed === true);
      }

      default: {
        return allTodos;
      }
    }
  };

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    const userFromServer = await getUserById(id);

    dispatch(setUserAction(userFromServer));
  };

  const remover = async (todoId: number) => {
    await removeTodo(todoId);
    const newTodos = await getTodos();

    dispatch(setTodosAction(newTodos));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Enter title"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <select
        value={completedTodos}
        onChange={(event) => setCompletedTodos(event.target.value)}
      >
        <option
          value="all"
        >
          all
        </option>
        <option
          value="active"
        >
          active
        </option>
        <option
          value="completed"
        >
          completed
        </option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredCompletedTodos(filteredTitleTodos).map((todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item',
                {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                })}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>
              <div className="button__container">
                <button
                  className={classNames('button',
                    {
                      button__focused: todo.userId === userId,
                    })}
                  type="button"
                  onClick={() => {
                    getUser(todo.userId);
                    setUserId(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>

                <button
                  className="
                    button__delete
                    button
                  "
                  type="button"
                  onClick={() => remover(todo.id)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
