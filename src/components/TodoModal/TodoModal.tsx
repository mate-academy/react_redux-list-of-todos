import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { closeCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  const todo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!todo) {
      setLoading(false);
    } else {
      setLoading(true);

      getUser(todo.userId)
        .then(loadedUser => {
          setUser(loadedUser);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading && <Loader />}
      {!loading && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(closeCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {todo.completed ? (
                <>
                  <strong className="has-text-success">Done</strong>
                  {' by '}
                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </>
              ) : (
                <>
                  <strong className="has-text-danger">Planned</strong>

                  {' by '}

                  <a href={`mailto:${user.email}`}>{user.name}</a>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
