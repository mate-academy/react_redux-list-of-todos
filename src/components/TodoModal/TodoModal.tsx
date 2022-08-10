import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo: Todo | undefined,
  onTodoSelected: (todoId: number) => void
};

export const TodoModal: React.FC<Props> = ({ todo, onTodoSelected }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (todo) {
        const userFromServer = await getUser(todo.userId);

        setUser(userFromServer);
        setIsLoad(false);
      }
    };

    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {!user || isLoad || !todo
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {todo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => onTodoSelected(0)}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong className={
                  classNames('has-text',
                    { 'has-text-danger': !todo.completed },
                    { 'has-text-success': todo.completed })
                }
                >
                  {
                    todo.completed === false
                      ? 'Planned'
                      : 'Done'
                  }

                </strong>

                {' by '}

                <a href={`${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
      ;
    </div>
  );
};
