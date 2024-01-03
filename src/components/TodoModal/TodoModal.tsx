import React from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';

type T = {
  thisTodo: Todo
  isLoading: boolean
  user: User | null
};

export const TodoModal: React.FC<T> = ({ thisTodo, isLoading, user }) => {
  const dispatch = useDispatch();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${thisTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {thisTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={`has-text-${thisTodo.completed ? 'success' : 'danger'}`}>
                {thisTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
