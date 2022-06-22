import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import './TodoList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSelectedUser, deleteTodo } from '../../redux/actions/todos';

enum Completed {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todosList.todos);
  const selectedUser = useSelector((state: RootState) => (
    state.todosList.selectedUser
  ));

  const [search, setSearch] = useState<string>('');
  const [completed, setCompleted] = useState<Completed | string>(Completed.all);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const selectUser = (userId: number) => {
    if (selectedUser !== userId) {
      dispatch(setSelectedUser(userId));
    }
  };

  const deleteTodoHandler = (todoId: number) => {
    dispatch(deleteTodo(todoId));
  };

  useEffect(() => {
    setFilteredTodos(todos.filter(item => {
      const isSearch = item.title.includes(search);

      switch (completed) {
        case Completed.active:
          return !item.completed && isSearch;

        case Completed.completed:
          return item.completed && isSearch;

        case Completed.all:
        default:
          return isSearch;
      }
    }));
  }, [search, completed, todos]);

  const randomOrder = () => {
    return setFilteredTodos(
      [...filteredTodos].sort(() => Math.random() - 0.5),
    );
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <div className="TodoList__nav">
          <input
            type="search"
            className="TodoList__search"
            placeholder="Search todo"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="TodoList__select"
            value={completed}
            onChange={(e) => setCompleted(e.target.value)}
          >
            <option value={Completed.all}>
              {Completed.all}
            </option>
            <option value={Completed.active}>
              {Completed.active}
            </option>
            <option value={Completed.completed}>
              {Completed.completed}
            </option>
          </select>
          <button
            type="button"
            className="TodoList__random button"
            onClick={() => randomOrder()}
          >
            Random
          </button>
        </div>
        <ul className="TodoList__list">
          {filteredTodos.length > 0 && (
            filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className={classnames(
                  'TodoList__item',
                  { 'TodoList__item--unchecked': todo.completed === false },
                  { 'TodoList__item--checked': todo.completed === true },
                )}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>

                <div className="TodoList__buttons">
                  <button
                    className={classnames(
                      'TodoList__user-button',
                      'button',
                      {
                        'TodoList__user-button--selected':
                        todo.userId === selectedUser,
                      },
                    )}
                    type="button"
                    onClick={() => selectUser(todo.userId)}
                  >
                    {`User #${todo.userId}`}
                  </button>
                  <button
                    className="TodoList__user-button_delete button"
                    type="button"
                    onClick={() => deleteTodoHandler(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
