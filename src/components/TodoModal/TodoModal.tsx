import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const closeModal = () => {
    dispatch(currentTodoAction.removeTodo());
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const userData = await getUser(currentTodo!.userId);

      setUserInfo(userData);
      setLoading(false);
    };

    fetchUser();
  }, [currentTodo]);

  return (
    <div
      className={
        currentTodo?.userId ? 'modal is-active' : 'modal is-not-active'
      }
      data-cy="modal"
    >
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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${userInfo?.email}`}>{userInfo?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
