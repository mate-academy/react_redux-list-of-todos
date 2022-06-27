import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { deleteTodo, getTodos, getUserById } from '../../api/api';
import { setTodosAction, setUserAction } from '../../store/actions';
import {
  getFilteredTodosSelector, getTodosSelector, getUserSelector,
} from '../../store/selectors';
import './TodoList.scss';
import { Todo } from '../../react-app-env';

enum Option {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);
  const user = useSelector(getUserSelector);
  const filteredTodosByCompleted = useSelector(getFilteredTodosSelector());

  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState<Option | string>('all');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const options = ['all', 'active', 'completed'];

  useEffect(() => {
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      setFilteredTodos(todosFromServer);
      dispatch(setTodosAction(todosFromServer));
    };

    loadTodosFromServer();
  }, []);

  const getUser = async (id: number) => {
    const userFromServer = await getUserById(id);

    dispatch(setUserAction(userFromServer));
  };

  const removeTodo = async (id: number) => {
    await deleteTodo(id);
    const todosFromServer = await getTodos();

    dispatch(setTodosAction(todosFromServer));
  };

  useEffect(() => {
    setFilteredTodos([...todos]);
  }, [todos]);

  const filteredByTitle = filteredTodos
    .filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));

  const visibleTodos = () => {
    switch (selectedOption) {
      case Option.All:
        setFilteredTodos(todos);
        break;
      case Option.Active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case Option.Completed:
        setFilteredTodos(filteredTodosByCompleted);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    visibleTodos();
  }, [selectedOption]);

  return (
    <div className="TodoList">
      <input
        type="text"
        value={title}
        data-cy="filterByTitle"
        className="input"
        onChange={(event) => {
          const { value } = event.target;

          setTitle(value);
        }}
        placeholder="Enter a todo"
      />
      <div className="select">
        <select
          value={selectedOption}
          onChange={event => setSelectedOption(event.target.value)}
        >
          {options.map(option => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredByTitle.map(todo => (
            <li
              className={classNames(
                'TodoList__item', {
                  'TodoList__item--checked': todo.completed,
                  'TodoList__item--unchecked': !todo.completed,
                },
              )}
              key={todo.id}
            >
              <label>
                <input type="checkbox" checked={todo.completed} readOnly />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__buttons">
                <button
                  className={classNames('TodoList__user-button button', {
                    'TodoList__user-button--selected': todo.userId === user?.id,
                  })}
                  type="button"
                  onClick={() => {
                    getUser(todo.userId);
                  }}
                >
                  {`User #${todo.userId}`}
                </button>
                <button
                  type="button"
                  className="button"
                  onClick={() => removeTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
