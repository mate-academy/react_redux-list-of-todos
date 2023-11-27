import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    userId,
    completed,
  } = todo;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (userId) {
      setIsLoading(true);

      getUser(userId).then(setUser)
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.log('Somethimg went wrong', e);
        })
        .finally(() => setIsLoading(false));
    }
  }, [userId]);

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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              title="delete"
              onClick={() => dispatch(currentTodoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              {!completed ? (
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
  );
};
