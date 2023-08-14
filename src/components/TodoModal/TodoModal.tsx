import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
  todoId: number;
};

export const TodoModal: React.FC<Props> = ({
  todos,
  todoId,
}) => {
  const todo = todos.find(el => el.id === todoId);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (todo) {
      getUser(todo.userId)
        .then(setUser)
        .finally(() => setLoading(false));
    }
  }, [todoId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && (
        <Loader />
      )}

      {!loading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(actions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{todo?.title}</p>

            <p className="block" data-cy="modal-user">
              <strong
                className={classNames({
                  'has-text-danger': !todo?.completed,
                  'has-text-success': todo?.completed,
                })}
              >
                {(todo?.completed) ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
