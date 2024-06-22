import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hook';
import { currentTodoSlice } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const { id, title, completed, userId } = todo;
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      getUser(userId)
        .then(setUser)
        .finally(() => setIsLoading(false));
    }, 1000);
  }, [userId]);

  const handleClick = () => {
    dispatch(currentTodoSlice.actions.addTodo(null));
  };

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
              onClick={() => handleClick()}
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
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
