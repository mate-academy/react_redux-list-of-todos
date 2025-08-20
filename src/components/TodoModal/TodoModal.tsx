import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { clearSelectedTodo } from '../../features/selectedTodoSlice';

export const TodoModal = () => {
  const dispatch = useDispatch();
  const { selectedTodo } = useAppSelector(state => state.selectedTodo);

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(selectedTodo.userId)
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}
      {!isLoading && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {'Todo #' + selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearSelectedTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={'mailto:' + user.email}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
