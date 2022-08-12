import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { getUser } from '../api';
import { Loader } from './Loader';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type Props = {
  todo: Todo;
  // eslint-disable-next-line react/require-default-props
  onClose?: () => void,
};

export const TodoModal: React.FC<Props> = ({
  todo,
  onClose = () => {},
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (todo.userId) {
      getUser(todo.userId).then(setUser);
    }
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      {!user ? <Loader /> : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium">
              Todo&nbsp;#
              {todo.id}
            </div>
            <a href="#close" className="delete" onClick={onClose}>Close</a>
          </header>

          <div className="modal-card-body">
            <p className="block">{todo.title}</p>

            <p className="block">
              <strong
                className={classNames({
                  'has-text-success': todo.completed,
                  'has-text-danger': !todo.completed,
                })}
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
