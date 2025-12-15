import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo.currentTodo);
  const user = useAppSelector(state => state.currentTodo.assignedUser);
  const loader = useAppSelector(state => state.currentTodo.isUserLoading);

  useEffect(() => {
    if (todo) {
      dispatch(currentTodoActions.setUserIsLoading(true));
      getUser(todo.userId)
        .then(userFromServer =>
          dispatch(currentTodoActions.setAssignedUser(userFromServer)),
        )
        .finally(() => dispatch(currentTodoActions.setUserIsLoading(false)));
    }
  }, [dispatch, todo]);

  if (!todo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(currentTodoActions.clear())}
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {!todo.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
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
