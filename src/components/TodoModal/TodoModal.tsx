import { useEffect } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { resetCurrentTodo, setUser } from '../../features/currentTodo';

export const TodoModal = () => {
  const dispatch = useDispatch();
  const { currentTodo, user } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then(userFromServer =>
        dispatch(setUser(userFromServer)),
      );
    }
  }, [currentTodo, dispatch]);

  const handleModalClose = () => dispatch(resetCurrentTodo());

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
              Todo #{currentTodo!.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleModalClose()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo!.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
