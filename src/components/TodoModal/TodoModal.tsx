import { FC, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  removeTodoUser: () => void,
  todo: Todo,
};

export const TodoModal: FC<Props> = ({
  todo,
  removeTodoUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const handleUser = async () => {
    const userFetch = await getUser(todo.userId || 0);

    setUser(userFetch);
  };

  useEffect(() => {
    handleUser();
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
                {`Todo #${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => removeTodoUser()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{todo.title}</p>

              <p className="block" data-cy="modal-user">
                {!todo.completed
                  ? (<strong className="has-text-danger">Planned</strong>)
                  : (<strong className="has-text-success">Done</strong>)}
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
