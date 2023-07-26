import cn from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as todoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoModal: React.FC<Props> = ({
  todo,
}) => {
  const dispatch = useDispatch();
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadUser = async () => {
    setIsLoading(true);
    setError(false);

    try {
      const userFromServer = await getUser(todo.id);

      setModalUser(userFromServer);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {error && (
        <p className="notification is-warning">
          Cant load user
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">

          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(todoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={cn(
                { 'has-text-success': todo.completed },
                { 'has-text-danger': !todo.completed },
              )}
              >
                {!todo.completed ? 'Planned' : 'Done'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {modalUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
