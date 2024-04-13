import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

import { currentTodoActions } from '../../features/currentTodo';
import { userActions } from '../../features/user';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);

  useEffect(() => {
    setIsLoading(true);

    async function fetchUser() {
      try {
        const response = await getUser(todo.userId);

        dispatch(userActions.addUser(response));
      } catch {
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [dispatch, todo.userId]);

  const handleCloseModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

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
              Todo #{todo.id}
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
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done by </strong>
              ) : (
                <strong className="has-text-danger">Planned by </strong>
              )}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
