import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { TodoCompleteStatus } from '../../types/TodoCompleteStatus';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTodo } = useAppSelector(store => store);

  const [user, setUser] = useState<User | null>(null);

  const handleCloseModal = useCallback(() => {
    dispatch(currentTodoActions.removeTodo());
  }, [dispatch]);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(setUser);
    }
  }, [currentTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        !user
          ? <Loader />
          : (currentTodo
            && (
              <div className="modal-card">
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    {`Todo #${currentTodo.id}`}
                  </div>

                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    type="button"
                    className="delete"
                    data-cy="modal-close"
                    onClick={handleCloseModal}
                  />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {currentTodo.title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {/* For not completed */}
                    <strong
                      className={
                        currentTodo.completed
                          ? 'has-text-success'
                          : 'has-text-danger'
                      }
                    >
                      {currentTodo.completed
                        ? TodoCompleteStatus.Done
                        : TodoCompleteStatus.Planned}

                    </strong>

                    {' by '}

                    <a href={`mailto:${user.email}`}>
                      {user.name}
                    </a>
                  </p>
                </div>
              </div>
            )
          )
      }

    </div>
  );
};
