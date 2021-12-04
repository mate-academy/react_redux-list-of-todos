import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { actions as actionsQuery } from '../../store/query';
import { actions as actionsUser } from '../../store/selectedUser';
import { actions as actionsStatus } from '../../store/status';
import { actions as actionsTodos } from '../../store/todos';

import './TodoList.scss';

export const TodoList = () => {
  const query = useSelector((state: RootState) => state.query.query);
  const status = useSelector((state: RootState) => state.status.status);
  const todos = useSelector((state: RootState) => state.todos.todos);
  const selectedUser = useSelector((state: RootState) => state.selectedUser.selectedUser);
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch();
  const setQuery = (inputQuery: string) => {
    dispatch(actionsQuery.changeQuery(inputQuery));
  };

  const setUser = (user: User | null) => {
    dispatch(actionsUser.setUser(user));
  };

  const setStatus = (selectedStatus: string) => {
    dispatch(actionsStatus.setStatus(selectedStatus));
  };

  const removeTodo = (selectedTodo: Todo) => {
    dispatch(actionsTodos.removeTodo(selectedTodo));
  };

  let visibleTodos: Todo[] = todos.filter((todo: Todo) => {
    const search: string = query.toLowerCase();

    return todo.title.toLowerCase().includes(search);
  });

  switch (status) {
    case 'active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;
    case 'completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    default:
      break;
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        value={query}
        placeholder="find todo"
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <select
        onChange={(event) => setStatus(event.currentTarget.value)}
        value={status}
        className="App-AddSelect"
      >
        <option
          value="all"
          className="App__AddOption"
        >
          all
        </option>
        <option
          value="active"
          className="App__AddOption"
        >
          active
        </option>
        <option
          value="completed"
          className="App__AddOption"
        >
          completed
        </option>
      </select>

      <div className="TodoList__list-container">
        {visibleTodos.map(todo => (
          <ul className="TodoList__list">
            <li
              key={todo.id}
              className={
                classNames('TodoList__item',
                  {
                    'TodoList__item--unchecked': !todo.completed,
                    'TodoList__item--checked': todo.completed,
                  })
              }
            >
              <label htmlFor="input">
                <input
                  id="input"
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__buttons">
                <button
                  className="TodoList__user-button button TodoList__user-button--selected"
                  type="button"
                  onClick={() => removeTodo(todo)}
                >
                  Remove this todo
                </button>

                <button
                  className={
                    classNames(
                      'TodoList__user-button',
                      'button',
                      {
                        'TodoList__user-button--selected': todo.userId !== selectedUser?.id,
                      },
                    )
                  }
                  type="button"
                  onClick={() => setUser(users.find(user => user.id === todo.userId) || null)}
                >
                  {`User #${todo.userId}`}
                </button>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};
