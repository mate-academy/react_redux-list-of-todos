import React from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  function handlerClose() {
    dispatch(currentTodoSlice.actions.clearCurrentTodo());
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handlerClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{todo?.user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
