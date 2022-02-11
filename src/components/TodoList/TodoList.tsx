import React, { useEffect, useState } from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllTodos,
  getSelectTodos,
  getUserById,
  updateCheckTodo,
} from '../../api/api';
import {
  clearUserAction,
  setTodosAction,
  setUserAction,
  setUserIdAction,
} from '../../store/actions';
import {
  getSelectedUserId,
  getTodos,
} from '../../store/selectors';

export const TodoList: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [inputFilterValue, setInputFilterValue] = useState('');
  const [selectFilterValue, setSelectFilterValue] = useState('All');

  const dispatch = useDispatch();
  const userId = useSelector(getSelectedUserId);
  const allTodos = useSelector(getTodos);

  const loadAllTodos = async () => {
    const todos = await getAllTodos();

    dispatch(setTodosAction(todos));
    setVisibleTodos(allTodos);
  };

  useEffect(() => {
    loadAllTodos();
  },
  []);

  const filterTodos = () => {
    const todos = allTodos.filter(todo => (todo.title.includes(inputFilterValue)));

    setVisibleTodos([...todos]);
  };

  useEffect(() => {
    filterTodos();
  },
  [allTodos, inputFilterValue]);

  const hendlerRandomSortTodos = () => {
    const random = Number((Math.random() * 20).toFixed(0));
    const todos = [...visibleTodos].sort((a, b) => {
      if (a.title[random] && b.title[random]) {
        return a.title[random].localeCompare(b.title[random]);
      }

      return -1;
    });

    setVisibleTodos([...todos]);
  };

  const loadUser = async (id: number) => {
    const serverUser = await getUserById(id);

    if (serverUser) {
      dispatch(setUserAction(serverUser));
    } else {
      dispatch(clearUserAction());
    }
  };

  const hendlerSelectUsersbyId = (id: number) => {
    if (userId !== id) {
      loadUser(id);
      dispatch(setUserIdAction(id));
    }
  };

  const loadCheckTodo = async (isChecked: boolean) => {
    const todos = await getSelectTodos(isChecked);

    dispatch(setTodosAction(todos));
    setVisibleTodos(allTodos);
  };

  const updateTodos = (value: string) => {
    switch (value) {
      case 'active':
        loadCheckTodo(false);
        break;
      case 'completed':
        loadCheckTodo(true);
        break;
      default:
        loadAllTodos();
    }
  };

  const setCheckTodo = async (id: number, isChecked: boolean) => {
    await updateCheckTodo(id, isChecked);

    updateTodos(selectFilterValue);
  };

  const hendlerFilterInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputFilterValue(value);
  };

  const hendlerFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    updateTodos(value);

    setSelectFilterValue(value);
  };

  return (
    <div className="TodoList">

      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          name="titleFilter"
          className="input"
          placeholder="Search todo"
          value={inputFilterValue}
          onChange={hendlerFilterInput}
        />
        <select
          name="selectTodos"
          defaultValue={selectFilterValue}
          className="select"
          onChange={hendlerFilterSelect}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>

        <button
          type="button"
          className="button is-primary is-light"
          onClick={hendlerRandomSortTodos}
        >
          Randomize
        </button>

        <ul className="TodoList__list">
          {
            visibleTodos.map(todo => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': !todo.completed },
                  { 'TodoList__item--checked': todo.completed },
                )}
              >
                <label htmlFor={`${todo.id}`}>
                  <input
                    type="checkbox"
                    id={`${todo.id}`}
                    checked={todo.completed}
                    onChange={() => (setCheckTodo(todo.id, todo.completed))}
                  />
                  <p>
                    {todo.title}
                  </p>
                </label>

                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    { 'TodoList__user-button--selected': (todo.userId === userId) },
                  )}
                  type="button"
                  onClick={() => (hendlerSelectUsersbyId(todo.userId))}
                >
                  User&nbsp;
                  {todo.userId}
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};
