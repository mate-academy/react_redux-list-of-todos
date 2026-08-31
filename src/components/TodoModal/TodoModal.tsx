import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setLoadingUser, setUser } from '../../features/user';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const loading = useAppSelector(state => state.user.loading);
  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    if (!todo) {
      return;
    }

    dispatch(setLoadingUser(true));

    getUser(todo.userId).then(users => dispatch(setUser(users)));
  }, [todo, dispatch]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading ? (
        <Loader />
      ) : (
        todo &&
        user && (
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
                onClick={() => {
                  dispatch(currentTodoSlice.actions.removeCurrentTodo());
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames(
                    todo.completed ? 'has-text-success' : 'has-text-danger',
                  )}
                >
                  {todo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
