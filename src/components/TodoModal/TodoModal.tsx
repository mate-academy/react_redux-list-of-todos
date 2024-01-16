import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const currentTodoState = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  const loadUserTodo = async () => {
    try {
      const todoUserId = currentTodoState.todo?.userId;

      if (todoUserId) {
        const getUserTodo: User = await getUser(todoUserId);

        setUser(getUserTodo);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    loadUserTodo();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodoState.todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoActions.activeTodoModal(false));
                dispatch(currentTodoActions.setTodo(null));
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodoState.todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  currentTodoState.todo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {currentTodoState.todo?.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
