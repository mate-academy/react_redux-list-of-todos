import React from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo, loading } = useAppSelector(state => state.currentTodo);

  let content = <></>;

  if (loading && !currentTodo) {
    content = <Loader />;
  } else if (!loading && currentTodo) {
    content = (
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #3
          </div>

          <button
            type="button"
            className="delete"
            aria-label="Close"
            data-cy="modal-close"
            onClick={() => dispatch(actions.removeTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {currentTodo?.completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}
            <a href="mailto:Sincere@april.biz">Leanne Graham</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {(loading || currentTodo) && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
          {content}
        </div>
      )}
    </>
  );
};
