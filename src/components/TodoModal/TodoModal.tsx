import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [{ name, email }, setUser] = useState<User>({} as User);
  const { removeTodo } = actions;
  const dispatch = useAppDispatch();

  const {
    title,
    id,
    completed,
    userId,
  } = useAppSelector(({ currentTodo }) => currentTodo as Todo);

  useEffect(() => {
    getUser(userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{title}</p>

              <p className="block" data-cy="modal-user">
                {completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}
                <a href={`mailto:${email}`}>{name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
