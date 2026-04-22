import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/user';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal = () => {
  const dispatch = useDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const user = useAppSelector(state => state.user);

  if (!todo && !user) {
    return null;
  }

  const closeTodo = () => {
    dispatch(setCurrentTodo(null));
    dispatch(setUser(null));
  };

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
              Todo #{todo?.id}
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
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
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
