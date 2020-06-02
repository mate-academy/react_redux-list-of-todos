import React from 'react';
import './TodoCard.scss';

import { useDispatch } from 'react-redux';
import { deleteTodo, setStatus } from '../../store';

type Props = {
  todo: Todo;
};

const TodoCard: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;
  const dispatch = useDispatch();

  return (
    <li>
      <article className="app__todo">
        <div>
          {`TODO: ${title}`}
        </div>
        <div>
          STATUS:
          {' '}
          {completed ? 'completed' : 'in progress'}
          <input
            checked={completed}
            type="checkbox"
            onChange={() => dispatch(setStatus(id))}
          />
        </div>
        <div>
          RESPONSIBLE:
          {' '}
          {user.name}
        </div>
        <button
          type="button"
          className="app__todo-detete"
          onClick={() => dispatch(deleteTodo(id))}
        >
          Delete
        </button>
      </article>
    </li>
  );
};

export default TodoCard;
