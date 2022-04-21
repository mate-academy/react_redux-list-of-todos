/* eslint-disable no-console */
import {
  FC, memo, useState, useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { ACTIONS_CREATORS } from '../../store/actions/todos.actions';
import { getSelectedUserIdSelector } from '../../store/selectors';
import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = memo(({ todos }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectCategory, setSelectCategory] = useState('All');

  const selectedUserId = useSelector(getSelectedUserIdSelector);
  const dispatch = useDispatch();
  const { setSelectedUserId } = ACTIONS_CREATORS;

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectCategory(event.target.value);
  };

  console.log('selectedUserId', selectedUserId);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => (
        todo.title.toLowerCase().includes(todoTitle.toLowerCase())
      ))
      .filter(todo => {
        switch (selectCategory) {
          case 'Active':
            return !todo.completed;

          case 'Completed':
            return todo.completed;

          default:
            return todos;
        }
      });
  }, [todos, todoTitle, selectCategory]);

  return (
    <div className="TodoList">

      <div className="control">
        <input
          className="input is-hovered"
          type="text"
          placeholder="Enter todo's name"
          onChange={event => handleTitleChange(event)}
        />
      </div>

      <div className="select">
        <select
          value={selectCategory}
          onChange={event => handleCategoryChange(event)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div className="TodoList__btns">
                <button
                  type="button"
                  className={classNames(
                    'TodoList__user-button', 'button', {
                      'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                    },
                  )}
                  onClick={() => dispatch(setSelectedUserId(todo.userId))}
                >
                  {`User #${todo.userId}`}
                </button>
                <button
                  type="button"
                  className="TodoList__user-button button"
                >
                  Delete
                </button>
              </div>

              {/* <button
                type="button"
                className={classNames(
                  'TodoList__user-button', 'button', {
                    'TodoList__user-button--selected':
                     todo.userId === selectedUserId,
                  },
                )}
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                User&nbsp;#
                {`${todo.userId}`}
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
