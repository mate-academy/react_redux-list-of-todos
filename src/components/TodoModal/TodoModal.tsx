import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal = () => {
  const user = useAppSelector(state => state.activeTodo.assignedUser);
  const activeTodo = useAppSelector(state => state.activeTodo.currTodo);
  const loader = useAppSelector(state => state.activeTodo.isUserLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeTodo) {
      dispatch(currentTodoActions.setUserIsLoading(true));
      getUser(activeTodo.userId)
        .then(userFromServer =>
          dispatch(currentTodoActions.setAssignedUser(userFromServer)),
        )
        .finally(() => dispatch(currentTodoActions.setUserIsLoading(false)));
    }
  }, [dispatch, activeTodo]);

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
              {`Todo #${activeTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoActions.setCurrTodos(null));
                dispatch(currentTodoActions.setAssignedUser(null));
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {activeTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {activeTodo?.completed ? (
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
