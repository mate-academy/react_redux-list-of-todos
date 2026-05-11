import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { setSelectedTodo } from '../../features/currentTodoSlice';
import { getUser } from '../../api';

type User = {
  id: number;
  name: string;
  email: string;
};

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo.selectedTodo);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setLoading(true);
    setUser(null);

    getUser(selectedTodo.userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [selectedTodo]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(setSelectedTodo(null))}
      />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodo.id}
          </div>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(setSelectedTodo(null))}
          />
        </header>
        <div className="modal-card-body">
          {loading && <Loader />}
          {!loading && user && (
            <>
              <p className="block" data-cy="modal-title">
                {selectedTodo.title.charAt(0).toUpperCase() +
                  selectedTodo.title.slice(1)}
              </p>
              <p className="block" data-cy="modal-user">
                {selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}
                {user && (
                  <>
                    {' by '}
                    <a href={`mailto:${user.email}`}>{user.name}</a>
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
