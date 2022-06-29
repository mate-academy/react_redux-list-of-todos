import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUser } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';

import './TodoList.scss';

enum TypeShow {
  All = 'all',
  Completed = 'completed',
  Uncompleted = 'uncompleted',
}
export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const [showBy, setShowBy] = useState<string>(TypeShow.All);

  const todosFromServer = async () => {
    dispatch(setTodosAction(await getTodos()));
  };

  const getUserFromServ = async (id: number) => {
    dispatch(setUserAction(await getUser(id)));
  };

  useEffect(() => {
    todosFromServer();
  }, []);

  const todos = useSelector(getTodosSelector);

  const resultArr = () => {
    switch (showBy) {
      case TypeShow.All:
        return [...todos];
      case TypeShow.Completed:
        return todos.filter(todo => todo.completed);
      case TypeShow.Uncompleted:
        return todos.filter(todo => !todo.completed);
      default:
        return [...todos];
    }
  };

  return (
    <>
      <select
        name="select"
        id="select"
        value={showBy}
        onChange={({ target }) => setShowBy(target.value)}
      >
        <option value={TypeShow.All}>All</option>
        <option value={TypeShow.Completed}>Completed</option>
        <option value={TypeShow.Uncompleted}>Uncompleted</option>
      </select>
      <ul className="list">
        {resultArr().map(todo => (
          <li
            className="list__item"
            key={todo.id}
          >
            <span className={
              classNames('list__item_compl', {
                list__item_uncompl: !todo.completed,
              })
            }
            >
              {todo.completed ? '✔' : 'not'}
            </span>
            {todo.title}

            <div className="list__item_button">
              <button
                type="button"
                className="list__item_button_btn"
                onClick={() => {
                  getUserFromServ(todo.userId);
                }}
              >
                Select User
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
