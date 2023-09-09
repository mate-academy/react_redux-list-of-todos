import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

import { Loader } from '../Loader';
import { getUser } from '../../api';

import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const clearTodo = () => dispatch(currentTodoActions.removeTodo());

  let todoID;
  let title;
  let completed;

  if (currentTodo) {
    ({ id: todoID, title, completed } = currentTodo);
  }

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(fetchedUser => setUser(fetchedUser))
        .finally(() => setIsLoading(false));
    }
  }, [currentTodo]);

  let email;
  let name;

  if (user) {
    ({ email, name } = user);
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoID}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={clearTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              <strong className={cn({
                'has-text-success': completed,
                'has-text-danger': !completed,
              })}
              >
                {completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              {user && (
                <a href={`mailto:${email}`}>{name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
