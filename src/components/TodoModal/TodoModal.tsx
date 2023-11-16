import React, { useEffect, useState } from 'react';
import { Todo } from 'types/Todo';
import { User } from 'types/User';
import { getUser } from 'api';
import { actions as currentTodoActions } from 'features/currentTodo';
import { useAppDispatch } from 'app/hooks';

import { Loader } from '../Loader';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  // prettier-ignore
  const {
    id, title, completed, userId,
  } = todo;

  const dispatch = useAppDispatch();
  // prettier-ignore
  const removeTodo = () => dispatch(
    currentTodoActions.removeTodo(),
  );

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then(setUser)
      .catch()
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        <Loader />
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

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
            onClick={removeTodo}
            type="button"
            className="delete"
            data-cy="modal-close"
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {title}
          </p>

          <p className="block" data-cy="modal-user">
            {completed ? (
              <strong className="has-text-success">Done</strong>
            ) : (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}
            <a href={`"mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
