import React from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { setIdAction } from '../../actions';
import './TodoCard.scss';

type Props = {
  todo: Todo,
};

export const TodoCard: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <p className="card__title">{todo.title}</p>
      <button
        className="card__btn"
        type="button"
        onClick={() => dispatch(setIdAction(todo.userId))}
      >
        {`Select user ${todo.userId}`}
      </button>
    </div>
  );
};
