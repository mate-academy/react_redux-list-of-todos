import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const currTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currTodo) {
      setIsLoading(true);
      getUser(currTodo.userId)
        .then(setSelectedUser)
        .finally(() => setIsLoading(false));
    }
  }, [currTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && currTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currTodo && currTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoSlice.actions.delete())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currTodo && currTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currTodo && currTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {selectedUser && (
                <a href={'mailto:' + selectedUser?.email}>
                  {selectedUser?.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
