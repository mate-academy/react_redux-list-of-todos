import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  currentTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentTodo && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${currentTodo?.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClick}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {!currentTodo?.completed ? (
              <strong className="has-text-danger">Planned</strong>
            ) : (
              <strong className="has-text-success">Done</strong>
            )}

            {' by '}
            <a href="mailto:Sincere@april.biz">Leanne Graham</a>
          </p>
        </div>
      </div>
    </div>
  );
};
