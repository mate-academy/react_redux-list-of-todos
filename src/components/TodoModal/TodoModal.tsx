import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todo: Todo;
};

export const TodoModal: FC<Props> = ({ todo }) => {
  const {
    id, title, userId, completed,
  } = todo;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  const closeTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const loadedUser = await getUser(userId);

        setUser(loadedUser);
      } catch (e) {
        throw new Error('something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

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
              {`Todo #${id}`}
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
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
