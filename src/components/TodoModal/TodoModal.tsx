import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/hooks';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { loaderSlice } from '../../features/loader';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const loading = useAppSelector(state => state.loading.loading);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(currentTodoSlice.actions.removeCurrentTodo());
    setUser(null);
    dispatch(loaderSlice.actions.setLoading(false));
  };

  useEffect(() => {
    if (todo && !user) {
      dispatch(loaderSlice.actions.setLoading(true));
      getUser(todo.userId)
        .then(res => setUser(res))
        .finally(() => dispatch(loaderSlice.actions.setLoading(false)));
    }
  }, [dispatch, todo, user]);

  return (
    <>
      {todo && (
        <div
          className={classNames('modal', { 'is-active': todo })}
          data-cy="modal"
        >
          <div className="modal-background" />

          <div className="modal-card">
            {loading ? (
              <Loader />
            ) : (
              <>
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
                    onClick={handleCloseModal}
                  />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {todo.title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {!todo.completed && (
                      <strong className="has-text-danger">Planned</strong>
                    )}

                    {todo.completed && (
                      <strong className="has-text-success">Done</strong>
                    )}

                    {' by '}
                    {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
