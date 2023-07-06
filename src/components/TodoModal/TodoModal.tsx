/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { AppDispatch } from '../../app/store';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';

interface Props {
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [fetchedUser, setFetchedUser] = useState<User | null>(null);

  const fetchUser = async (userId: number) => {
    try {
      const userFromServer = await getUser(userId);

      setFetchedUser(userFromServer);
    } catch {
      console.error('user not found');
    }
  };

  useEffect(() => {
    if (todo) {
      fetchUser(todo.userId);
    }
  }, []);

  const handleClose = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${todo.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={handleClose}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{todo.title}</p>

          <p className="block" data-cy="modal-user">
            {todo.completed && (
              <strong className="has-text-success">Done</strong>
            )}
            {!todo.completed && (
              <strong className="has-text-danger">Planned</strong>
            )}

            {' by '}
            {fetchedUser && <a href={`mailto:${fetchedUser.email}`}>{fetchedUser.name}</a>}
            {!fetchedUser && <Loader />}
          </p>
        </div>
      </div>
    </div>
  );
};
