import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const closeTodo = () => dispatch(currentTodoSlice.actions.removeTodo());
  const userId = todo?.userId;

  useEffect(() => {
    if (!userId) {
      setUser(null);

      return;
    }

    setLoading(true);
    setUser(null);

    const load = async () => {
      try {
        const todos = await getUser(userId);

        setUser(todos);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading || !user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!todo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {todo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
