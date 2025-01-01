import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { resetCurrentTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo!;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(resetCurrentTodo());
  };

  const handleGetUser = (selectedUserId: number) => {
    setLoading(true);

    getUser(selectedUserId)
      .then(setUser)
      .finally(() => setLoading(false));
  };

  useEffect(() => handleGetUser(userId), [userId]);

  return (
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
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn({
                  'has-text-success': completed,
                  'has-text-danger': !completed,
                })}
              >
                {completed ? 'Done' : 'Planned'}
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
