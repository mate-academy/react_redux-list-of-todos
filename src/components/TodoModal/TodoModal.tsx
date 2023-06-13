import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch } from '../../app/hooks';
import { actions as actionsCurrTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  const dispatch = useAppDispatch();
  const removeSelectedTodo = () => {
    dispatch(actionsCurrTodo.removeTodo());
  };

  useEffect(() => {
    const getUserFromServer = async () => {
      try {
        const userFromServer = await getUser(userId);

        setUser(userFromServer);
      } finally {
        setIsLoading(false);
      }
    };

    getUserFromServer();
  }, [userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {!isLoading && user && (

        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            {user && (
              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {completed
                    ? 'Done'
                    : 'Planned'}
                </strong>
                {/* <strong className="has-text-success">Done</strong> */}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
