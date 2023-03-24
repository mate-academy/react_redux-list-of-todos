import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppDispatch } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  currentTodo: Todo
};

export const TodoModal: React.FC<Props> = ({
  currentTodo,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await getUser(currentTodo.userId);

        setUser(userInfo);
      } catch (error) {
        throw new Error('User upload error');
      }
    };

    fetchUser();
  }, []);

  const removeSelectedTodo = () => dispatch(currentTodoActions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="modal close"
              onClick={removeSelectedTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed
                ? (
                  <strong className="has-text-success">
                    Done
                  </strong>
                )
                : (
                  <strong className="has-text-danger">
                    Planned
                  </strong>
                )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
