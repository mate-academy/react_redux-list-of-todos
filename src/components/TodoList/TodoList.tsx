import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TodoList.scss';
import classnames from 'classnames';
import { deleteTodoById, getTodos, getUserById } from '../../api/api';
import { setTodosAction, setUser } from '../../store/actions';
import { getTodosSelector, getUserSelector } from '../../store/selectors';

enum Selected {
  All,
  Active,
  Complited,
}

export const TodoList: React.FC = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [selectedSelect, setSelectedSelect] = useState('0');
  const [currentError, setCurrentError] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const user = useSelector(getUserSelector);

  useEffect(() => {
    const loadTodosFromServer = async () => {
      try {
        const todosFromServer = await getTodos();

        dispatch(setTodosAction(todosFromServer));
      } catch (error) {
        setCurrentError(true);
      }
    };

    loadTodosFromServer();
  }, [todos]);

  const prepearedTodos = () => {
    const filteredTodos = todos.filter(todo => {
      return todo.title.includes(currentValue);
    });

    switch (+selectedSelect) {
      case Selected.Active:
        return filteredTodos.filter(({ completed }) => !completed);

      case Selected.Complited:
        return filteredTodos.filter(({ completed }) => completed);

      default:
        return filteredTodos;
    }
  };

  const getUser = async (id: number) => {
    try {
      const userFromServer = await getUserById(id);

      dispatch(setUser(userFromServer));
    } catch (error) {
      dispatch(setUser(null));
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">

        <div className="">
          <input
            type="text"
            placeholder="Search by title"
            value={currentValue}
            data-cy="filterByTitle"
            onChange={(event) => {
              setCurrentValue(event.target.value);
            }}
          />
          {' '}
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>): void => {
              setSelectedSelect(event.target.value);
            }}
          >
            <option value="0">All</option>
            <option value="1">Active</option>
            <option value="2">Complited</option>
          </select>
        </div>

        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {!currentError && prepearedTodos().map(todo => (
            <li
              className={classnames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__boxbuttons">
                <button
                  className={classnames(
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected':
                      user?.id === todo.userId,
                    },
                  )}
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    getUser(todo.userId);
                  }}
                >
                  {`User ${todo.userId}`}
                </button>
                <button
                  className="TodoList__user-button"
                  type="button"
                  data-cy="userButton"
                  onClick={() => {
                    deleteTodoById(todo.id);
                  }}
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
