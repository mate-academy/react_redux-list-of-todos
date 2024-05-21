import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const { title, completed, userId } = todo;
  const [userLoader, setUserLoader] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setUserLoader(true);

    getUser(userId).then(person => {
      if (person.id === userId) {
        setUser(person);
      }
    });
    setTimeout(() => setUserLoader(false), 1000);
  }, [userId]);

  if (user) {
    const { name, email } = user;

    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />

        {userLoader ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo.id}
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
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={classNames({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                <a href={`mailto:${email}`}>{name}</a>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  } else {
    return;
  }
};
