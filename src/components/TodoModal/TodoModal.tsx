/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Loader } from '../Loader';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const { title, id, completed, userId } = todo;

  const onClick = () => {
    dispatch(currentTodoAction.removeTodo());
  };

  useEffect(() => {
    getUser(userId).then(response => setUser(response));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
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
                onClick={onClick}
                type="button"
                className="delete"
                data-cy="modal-close"
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{title}</p>

              <p className="block" data-cy="modal-user">
                {!completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>}

                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
