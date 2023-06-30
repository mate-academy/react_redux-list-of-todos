import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
    if (currentTodo?.userId) {
      const loadedUser = await getUser(currentTodo?.userId);

      setUser(loadedUser);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <>
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
                {currentTodo?.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={removeTodo}
              />
            </header>

            <div className="modal-card-body">
              <p
                className="block"
                data-cy="modal-title"
              >
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo?.completed
                  ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                {' by '}
                <a href={user?.email}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
