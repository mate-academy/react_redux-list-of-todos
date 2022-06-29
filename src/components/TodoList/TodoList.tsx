import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, getUserById } from '../../api/api';
import { TodosStatus } from '../../store';
import {
  setTodosAction,
  setUserAction,
  setStatusAction,
  setFilterAction,
} from '../../store/actions';
import {
  getFilterSelector,
  getStatusSelector,
  getTodosSelector,
  getUserSelector,
} from '../../store/selector';

import './TodoList.scss';

export const TodoList = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatusSelector);
  const todos = useSelector(getTodosSelector);
  const user = useSelector(getUserSelector);
  const filter = useSelector(getFilterSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      let todosFromServer = await getTodos();

      todosFromServer = todosFromServer.filter(el => el.title.includes(filter));

      switch (status) {
        case TodosStatus.completed: {
          dispatch(
            setTodosAction(
              todosFromServer.filter(el => el.completed === true),
            ),
          );
          break;
        }

        case TodosStatus.inProgress: {
          dispatch(
            setTodosAction(
              todosFromServer.filter(el => el.completed === false),
            ),
          );
          break;
        }

        default: {
          dispatch(setTodosAction(todosFromServer));
          break;
        }
      }
    };

    loadTodosFromServer();
  }, [status, filter]);

  const getUser = async (id: number) => {
    const userFromServer = await getUserById(id);

    dispatch(setUserAction(userFromServer));
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        onChange={(event) => {
          setTimeout(() => {
            dispatch(setFilterAction(event.target.value));
          }, 1000);
        }}
      />
      <select onChange={(event) => {
        switch (event.target.value) {
          case '1': {
            dispatch(setStatusAction(TodosStatus.completed));
            break;
          }

          case '2': {
            dispatch(setStatusAction(TodosStatus.inProgress));
            break;
          }

          default: {
            dispatch(setStatusAction(TodosStatus.all));
            break;
          }
        }
      }}
      >
        <option value="0">All Todos</option>
        <option value="1">Completed Todos</option>
        <option value="2">In progress Todos</option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={
                classNames(
                  'TodoList__item',
                  { 'TodoList__item--checked': todo.completed },
                  { 'TodoList__item--unchecked': !todo.completed },
                )
              }
            >
              <label>
                {todo.completed && (
                  <input
                    type="checkbox"
                    readOnly
                    checked
                  />
                )}
                {!todo.completed && (
                  <input
                    type="checkbox"
                    readOnly
                  />
                )}

                <p>{todo.title}</p>
              </label>

              <button
                className={classNames(
                  'TodoList__user-button',
                  {
                    'TodoList__user-button--selected':
                     ((user !== null) && (user.id === todo.userId)),
                  },
                  'button',
                )}
                type="button"
                onClick={() => {
                  getUser(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
