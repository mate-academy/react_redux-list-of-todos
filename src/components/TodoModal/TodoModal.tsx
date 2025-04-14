import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { setCurrentUser, clearCurrentUser } from '../../features/currentUser';
import { clearCurrentTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';
//import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.currentTodo);
  const user = useSelector((state: RootState) => state.currentUser);
  //const status = useSelector((state: RootState) => state.todos.status);

  // Guard against undefined `todo`
  useEffect(() => {
    if (todo && (!user || user.id !== todo.userId)) {
      getUser(todo.userId).then(fetchedUser => {
        dispatch(setCurrentUser(fetchedUser));
      });
    }
  }, [dispatch, todo, user]);

  if (!todo) {
    return null;
  }

  const loading = !user || user.id !== todo.userId;

  const handleClose = () => {
    dispatch(clearCurrentTodo());
    dispatch(clearCurrentUser());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={handleClose} />

      {loading ? (
        //<div className="modal-content has-text-centered">
        <Loader />
      ) : (
        //</div>
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleClose}
              aria-label="close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>{' '}
              by <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
