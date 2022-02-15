import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTodosSelector, getUserIdSelector } from '../../store/selectors';
import { deleteTodoAction, loadTodosAction, loadUserAction } from '../../store/actions';
import { getUser } from '../../api/user';
import { deleteTodo, getTodos } from '../../api/todos';

import './TodosList.scss';
import { Loader } from '../Loader';
// import { Todo } from '../../react-app-env';

export const TodosList: React.FC = () => {
  const [title, setTitle] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const selectedUserId = useSelector(getUserIdSelector);

  const dispatch = useDispatch();

  const todos = useSelector(getTodosSelector);

  const handleClick = async (userId: number) => {
    const userFromServer = await getUser(userId);

    dispatch(loadUserAction(userFromServer));
  };

  useEffect(() => {
    setIsLoading(true);
    const loadTodosFromServer = async () => {
      const todosFromServer = await getTodos();

      dispatch(loadTodosAction(todosFromServer));
      setIsLoading(false);
    };

    loadTodosFromServer();
  }, []);

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);
    dispatch(deleteTodoAction(todoId));
  };

  const filteredTodos = todos.filter(todo => todo.title
    .toLowerCase().includes(title.toLowerCase()));
  const visibleTodos = filteredTodos.filter(todo => {
    switch (filterBy) {
      case 'all':
        return todo;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return 0;
    }
  });

  const changeStatus = (userId: number) => {
    const newTodoStatus = todos.map(todo => {
      if (todo.id === userId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    dispatch(loadTodosAction(newTodoStatus));
  };

  return (
    <div className="TodoList">
      <input
        className="input is-primary"
        placeholder="Wrire a title"
        name="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="select is-primary">
        <select
          name="status"
          value={filterBy}
          onChange={(event) => setFilterBy(event.target.value)}
        >
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="active">incompleted</option>
        </select>
      </div>

      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <ul className="TodoList__list">
            {!isLoading
              ? (visibleTodos.map(todo => (
                <li
                  key={todo.id}
                  className={classNames(
                    'TodoList__item',
                    {
                      'TodoList__item--unchecked': !todo.completed,
                      'TodoList__item--checked': todo.completed,
                    },
                  )}
                >
                  <button
                    className="TodoList__user-button button"
                    type="button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                  <label htmlFor={`${todo.id}`}>
                    <input
                      type="checkbox"
                      id={`${todo.id}`}
                      checked={todo.completed}
                      onChange={() => changeStatus(todo.id)}
                    />
                    <p>{todo.title}</p>
                  </label>

                  <button
                    className={classNames(
                      'TodoList__user-button',
                      'button',
                      { 'TodoList__user-button--selected': selectedUserId === todo.userId },
                    )}
                    type="button"
                    onClick={() => selectedUserId !== todo.userId && handleClick(todo.userId)}
                  >
                    User&nbsp;#
                    {todo.userId}
                  </button>
                </li>
              )))
              : <Loader />}
          </ul>
        </div>
      </div>
    </div>
  );
};
