import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const targetTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function setTargetUser() {
    if (!targetTodo) {
      setUser(null);

      return;
    }

    setIsLoading(true);
    const newUser = await getUser(targetTodo.userId);

    try {
      setUser(newUser);
    } catch {
      throw new Error();
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setTargetUser();
  }, [targetTodo]);

  function removeTargetTodo() {
    dispatch(actions.removeTodo());
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? <Loader /> : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${targetTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="button"
              onClick={() => removeTargetTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{targetTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {
                targetTodo?.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )
              }
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
