import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppDispatch } from '../../app/hooks';

type Props = {
  selectedTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ selectedTodo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(error => {
        throw error;
      })
      .finally(() => setLoading(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loading && <Loader />}

      {!loading && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() =>
                dispatch(currentTodoSlice.actions.deleteCurrentTodo())
              }
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
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
