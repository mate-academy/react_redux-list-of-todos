import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        if (selectedTodo) {
          const data = await getUser(selectedTodo.userId);

          setUser(data);
          setIsLoading(false);
        }
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? (
          <Loader />)
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${selectedTodo?.id}`}
              </div>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  return dispatch(actions.removeTodo());
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>
              {isError && (
                <h2 style={{ color: 'red' }}>
                  An error occured while user loading
                </h2>
              )}

              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                { ' by ' }
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
