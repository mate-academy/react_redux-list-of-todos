import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';
import { actions as todosActions } from '../../features/todos';

export const TodoModal: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!currentTodo || currentTodo.userId === user?.id) {
      return;
    }

    getUser(currentTodo.userId)
      .then(item => setUser(item))
      .catch(err => dispatch(todosActions.setError(err)));
  });

  if (!currentTodo) {
    return null;
  }

  return (
    <div className={cn('modal', { 'is-active': currentTodo })} data-cy="modal">
      <div className="modal-background" />

      {currentTodo.userId !== user?.id
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${currentTodo.id}`}
              </div>
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(actions.removeTodo())}
              >
                {' '}
              </button>
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{currentTodo.title}</p>
              <p className="block" data-cy="modal-user">
                <strong
                  className={cn(
                    {
                      'has-text-danger': !currentTodo.completed,
                      'has-text-success': currentTodo.completed,
                    },
                  )}
                >
                  {currentTodo.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={user?.email}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
