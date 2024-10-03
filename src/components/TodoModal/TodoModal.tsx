import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  selectedTodo: Todo;
  setSelectedTodo: (selectedTodo: Todo | null) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [user, setUser] = useState<User>();
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setUserLoading(true);
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setUserLoading(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
