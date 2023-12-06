import React, {
  useState,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(userData => setUser(userData))
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  const statusMsg = selectedTodo?.completed ? 'Done' : 'Planned';

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
              {`Todo #${selectedTodo?.id}`}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className={
                `has-text-${selectedTodo?.completed ? 'success' : 'danger'
                }`
              }
              >
                {statusMsg}
              </strong>
              {' by '}
              <a href={user?.email}>
                {user?.name}
              </a>
            </p>
          </div>

        </div>
      )}
    </div>
  );
};
