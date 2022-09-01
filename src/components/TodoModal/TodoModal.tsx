import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { selectors } from '../../store';
import { actions as userActions, fetchUser } from '../../store/user';
import { actions as todosActions } from '../../store/todos';

interface Props {
  todo: Todo;
}

export const TodoModal: FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(selectors.getUserInfo);

  useEffect(() => {
    dispatch(fetchUser(todo.userId));

    return () => {
      dispatch(userActions.userUnselect());
    };
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
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

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(todosActions.unselectTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
