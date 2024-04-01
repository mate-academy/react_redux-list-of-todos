import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

interface Props {
  curentTodo: Todo;
}

export const TodoModal: React.FC<Props> = ({ curentTodo }) => {
  const [loading, setLoading] = useState(true);
  const dispath = useDispatch();
  const [user, setUser] = useState<User | null>(null);

  const handleDeleteTodo = () => {
    dispath(actions.removeTodo());
  };

  useEffect(() => {
    setLoading(true);
    getUser(curentTodo.userId).then(userFromServer => {
      setUser(userFromServer);
      setLoading(false);
    });
  }, []);

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
              Todo #{curentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDeleteTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {curentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {curentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
