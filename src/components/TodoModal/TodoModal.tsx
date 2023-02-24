import { useState, useEffect } from 'react';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const remove = () => dispatch(actions.removeTodo());
  const openedTodo = useAppSelector(state => state.currentTodo);
  const [error, setError] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (openedTodo) {
        try {
          const user = await getUser(openedTodo.userId);

          setSelectedUser(user);
        } catch {
          setError('Something went wrong!');
        }
      } else {
        setSelectedUser(null);
      }
    };

    loadData();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser && openedTodo && !error
        ? (
          <Loader />
        ) : (
          <>
            {error && (
              <p className="notification is-warning">
                Something went wrong!
              </p>
            )}

            {openedTodo && (
              <div className="modal-card">
                <header className="modal-card-head">
                  <div
                    className="modal-card-title has-text-weight-medium"
                    data-cy="modal-header"
                  >
                    {`Todo #${openedTodo.id}`}
                  </div>

                  <button
                    type="button"
                    className="delete"
                    data-cy="modal-close"
                    aria-label="modal-close"
                    onClick={remove}
                  />
                </header>

                <div className="modal-card-body">
                  <p className="block" data-cy="modal-title">
                    {openedTodo.title}
                  </p>

                  <p className="block" data-cy="modal-user">
                    {
                      openedTodo.completed
                        ? <strong className="has-text-success">Done</strong>
                        : (
                          <strong className="has-text-danger">
                            Planned
                          </strong>
                        )
                    }

                    {' by '}

                    {selectedUser && (
                      <a href={`mailto:${selectedUser.email}`}>
                        {selectedUser.name}
                      </a>
                    )}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
    </div>
  );
};
