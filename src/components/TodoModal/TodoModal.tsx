import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo.userId)
        .then(users => setUser(users));
    }
  }, []);

  // const handlerClosePost = () => {
  //   dispatch(actions.removeTodo());
  // };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && <Loader />}

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
            onClick={() => dispatch(actions.removeTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

          <p className="block" data-cy="modal-user">
            {/* For not completed */}
            <strong className={cn({
              'has-text-success': currentTodo?.completed,
              'has-text-danger': !currentTodo?.completed,
            })}
            >
              {currentTodo?.completed ? ('Done') : ('Planned')}
            </strong>

            {' by '}
            <a href={`mailto:${user?.email}`}>
              {user?.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
