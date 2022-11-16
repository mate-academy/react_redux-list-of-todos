import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    getUser(todo.userId).then(response => {
      setSelectedUser(response);
    });
  }, [todo]);

  const resetTodo = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        {!selectedUser ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {todo?.id}
              </div>

              <button
                aria-label="modal-close"
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={resetTodo}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {todo?.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}

                {' by '}

                <a href={`mailto:${selectedUser?.email}`}>
                  {selectedUser?.name}
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
