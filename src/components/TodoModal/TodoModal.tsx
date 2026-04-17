import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadUser, clearCurrentTodo } from '../../features/currentTodo';

export const TodoModal = () => {
  const dispatch = useAppDispatch();

  const { todo, user, loading } = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (!todo?.userId) {
      return;
    }

    dispatch(loadUser(todo.userId));
  }, [todo?.userId, dispatch]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title" data-cy="modal-header">
            Todo #{todo.id}
          </p>

          <button
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(clearCurrentTodo())}
          />
        </header>

        <section className="modal-card-body">
          <p data-cy="modal-title">{todo.title}</p>

          {loading && <div data-cy="loader">Loading user...</div>}

          {!loading && user && (
            <div data-cy="modal-user">
              {todo.completed
                ? `Done by ${user.name}`
                : `Planned by ${user.name}`}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
