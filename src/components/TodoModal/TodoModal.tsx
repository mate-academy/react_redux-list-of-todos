import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const deleteCurrentTodo = () => {
    dispatch(deleteTodo());
    setUser(null);
  };

  useEffect(() => {
    if (currentTodo === null) {
      return;
    }

    getUser(currentTodo.userId).then(res => {
      setUser(res);
    });
  }, [currentTodo]);

  return (
    <>
      {currentTodo !== null && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
          {user === null ? (
            <Loader />
          ) : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #{currentTodo.id}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={deleteCurrentTodo}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {currentTodo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {!currentTodo.completed ? (
                    <strong className="has-text-danger">Planned</strong>
                  ) : (
                    <strong className="has-text-success">Done</strong>
                  )}

                  {' by '}
                  <a href={`mailto:${user?.email}`}>{user?.name}</a>
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
