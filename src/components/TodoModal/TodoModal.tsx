import React from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const closeTodo = () => dispatch(currentTodoSlice.actions.clearTodo(null));

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {false && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #3
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => closeTodo()}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            fugiat veniam minus
          </p>

          <p className="block" data-cy="modal-user">
            {/* For not completed */}
            <strong className="has-text-danger">Planned</strong>

            {/* For completed */}
            <strong className="has-text-success">Done</strong>
            {' by '}
            <a href="mailto:Sincere@april.biz">Leanne Graham</a>
          </p>
        </div>
      </div>
    </div>
  );
};
