import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { Maybe } from '../../types/Maybe';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { selectors } from '../../store';
import { actions as loadingActions } from '../../store/loading';
import { actions as todoActions } from '../../store/currentTodo';

interface Props {
  todo: Todo;
}

export const TodoModal: FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<Maybe<User>>(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.isLoading);

  useEffect(() => {
    dispatch(loadingActions.startLoading());

    getUser(todo.userId)
      .then(userFromServer => setUser(userFromServer))
      .finally(() => dispatch(loadingActions.finishLoading()));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
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
              onClick={() => dispatch(todoActions.unSelect())}
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
