import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import { RootState } from '../../app/store';

type Props = {
  isLoadingUser: boolean;
};

export const TodoModal: React.FC<Props> = ({
  isLoadingUser,
}) => {
  const currentTodo = useSelector<RootState, Todo | null>(
    (state) => state.currentTodo,
  );

  const curentUser = useSelector<RootState, User | null>(
    (state) => state.selectedUser.user,
  );
  const dispatch = useDispatch();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoadingUser ? (
        <Loader />
      ) : (
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
              onClick={() => {
                dispatch(actions.removeTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo && currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo && (
                <strong
                  className={
                    currentTodo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {currentTodo.completed ? 'Done' : 'Planned'}
                </strong>
              )}
              {' by '}
              {curentUser && (
                <a href={`mailto:${curentUser.email}`}>{curentUser.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
