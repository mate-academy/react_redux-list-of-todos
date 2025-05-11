import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const data = await getUser(todo?.userId as number);

        setUser(data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [todo?.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              onClick={() =>
                dispatch(currentTodoSlice.actions.clearCurrentTodo())
              }
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
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
