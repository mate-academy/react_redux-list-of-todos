import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const close = () => dispatch(currentTodoSlice.actions.removeTodo());

  useEffect(() => {
    if (!currentTodo) {
      setUser(null);
      setLoading(false);

      return;
    }

    setUser(null);
    setLoading(true);

    getUser(currentTodo.userId)
      .then(setUser)
      .finally(() => {
        setLoading(false);
      });
  }, [currentTodo]);

  return (
    currentTodo && (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {loading ? (
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
                onClick={() => {
                  close();
                  setUser(null);
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                <strong
                  className={classNames({
                    'has-text-danger': !currentTodo.completed,
                    'has-text-success': currentTodo.completed,
                  })}
                >
                  {currentTodo.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    )
  );
};
