import { FC, useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actionTodos } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { Notifications } from '../Notifications';

export const TodoModal: FC = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatchSelectedTodo = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  const fetchSelectedTodo = async (id: number) => {
    try {
      setIsLoad(true);
      setIsError(false);
      const userFromAPI = await getUser(id);

      setUser(userFromAPI);
    } catch {
      setIsError(true);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    if (selectedTodo) {
      fetchSelectedTodo(selectedTodo.userId);
    }
  }, [selectedTodo]);

  const hendlerClose = () => {
    dispatchSelectedTodo(actionTodos.removeTodo());
    setUser(null);
  };

  if (!user && !isLoad && !selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoad && <Loader />}

      {isError && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title">
              <Notifications />
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={hendlerClose}
            />
          </header>
        </div>
      )}

      {user && selectedTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={hendlerClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
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
