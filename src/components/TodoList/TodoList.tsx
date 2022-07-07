import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { getInitTodos, getId, getSelectedId } from '../../store';
import { setInitTodos, setSelectedId, setId } from '../../store/actions';
import { getTodos } from '../../api';
import './TodoList.scss';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getInitTodos);
  const id = useSelector(getId);
  const selectedId = useSelector(getSelectedId);

  useEffect(() => {
    getTodos().then(res => {
      const todosFromServer = res.sort((a, b) => a.userId - b.userId);

      dispatch(setInitTodos(todosFromServer));
    });
  }, []);

  useEffect(() => {
    if (!todos.some(todo => todo.userId === selectedId)) {
      dispatch(setSelectedId(0));
    }
  }, [id]);

  return (
    <div className="TodoList">
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
              })}
            >
              <div className="TodoList__item-container">
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                  />
                  <p>{todo.title}</p>
                </label>
                <button
                  className={classNames('TodoList__user-button', 'button', {
                    'user-button': selectedId === todo.userId,
                  })}
                  type="button"
                  data-cy="userButton"
                  onClick={() => (
                    dispatch(setSelectedId(todo.userId))
                  )}
                >
                  {`User #${todo.userId}`}
                </button>
              </div>
              <button
                type="button"
                className="button button-delete"
                onClick={() => dispatch(setId(todo.id))}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
