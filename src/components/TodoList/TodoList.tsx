import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodo, getUserById } from '../../API/api';
import { Todo } from '../../react-app-env';
import { setTodosAction, setUserAction } from '../../store/actions';
import { getTodosSelector, getUserSelector } from '../../store/selectors';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);
  const selectedUser = useSelector(getUserSelector);

  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');

  const filteredTodos = todos.filter(todo => todo.title.includes(title));

  useEffect(() => {
    getTodo()
      .then(todosFromServer => dispatch(setTodosAction(todosFromServer)));
  }, []);

  const getUser = (id: number) => {
    getUserById(id)
      .then(userFromServer => dispatch(setUserAction(userFromServer)));
  };

  const filteredTodosByStatus = (allTodos: Todo[]) => {
    switch (status) {
      case 'active': {
        return allTodos.filter(todo => !todo.completed);
      }

      case 'completed': {
        return allTodos.filter(todo => todo.completed);
      }

      default: {
        return allTodos;
      }
    }
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <p>Filter todos by title: </p>
        <input
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <p>Filter todos by status: </p>
        <select
          onChange={event => setStatus(event.target.value)}
        >
          <option value="all">
            All
          </option>
          <option value="active">
            Active
          </option>
          <option value="completed">
            Completed
          </option>
        </select>
        <ul className="TodoList__list">
          {filteredTodosByStatus(filteredTodos).map((todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                />
                <p>{todo.title}</p>
              </label>

              <button
                className={classNames('TodoList__user-button', 'button', {
                  'TodoList__user-button--selected':
                    selectedUser?.id === todo.userId,
                })}
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
