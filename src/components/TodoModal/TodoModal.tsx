import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { removeTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    todo,
    isTodoLoading,
  } = useAppSelector((state: RootState) => state.currentTodo);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isTodoLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${todo?.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(removeTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{todo?.title}</p>

          <p className="block" data-cy="modal-user">
            {todo?.completed
              ? <strong className="has-text-danger">Planned</strong>
              : <strong className="has-text-success">Done</strong>}
            {' by '}
            <a href="mailto:Sincere@april.biz">Leanne Graham</a>
          </p>
        </div>
      </div>
    </div>
  );
};
