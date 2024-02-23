import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { User } from '../../types';

export const TodoModal: React.FC = () => {
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setModalLoading(true);
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(data => {
          setUser(data);
        })
        .finally(() => {
          setModalLoading(false);
        });
    }
  }, [currentTodo]);

  const handleCloseModal = () => {
    dispatch(actions.removeTodo());
    setUser(null);
    setModalLoading(true);
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {modalLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="close"
              onClick={handleCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
