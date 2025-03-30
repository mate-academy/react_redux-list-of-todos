import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC<{ currentTodo: Todo }> = ({ currentTodo }) => {
  const dispatch = useDispatch();
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  function henndleCloseTodo() {
    setUser(null);
    dispatch(actions.removeCurrentTodo());
  }

  useEffect(() => {
    getUser(currentTodo.userId)
      .then(c => setUser(c))
      .finally(() => {
        setLoadingUser(false);
      });
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loadingUser ? (
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
              aria-label="Close todo card"
              className="delete"
              data-cy="modal-close"
              onClick={henndleCloseTodo}
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
                  'has-text-success': currentTodo.completed,
                  'has-text-danger': !currentTodo.completed,
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
  );
};
