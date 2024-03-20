import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as userActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // setIsLoading(true);
    if (todo) {
      getUser(todo.userId).then(setUser);
    }

    // setIsLoading(false);
  }, [todo]);

  const handleClickClose = () => {
    dispatch(userActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && <Loader />}

      {user && todo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClickClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!todo.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {todo.completed && (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={user.email}>Leanne Graham</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
