import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { actions as currTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currTodo = useSelector<RootState>(state => state.currTodo) as Todo;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUser(currTodo.userId)
      .then(res => setUser(res))
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [currTodo.userId]);

  const closeTodo = () => dispatch(currTodoActions.clear());

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
              Todo #{currTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              {user && <a href={user?.email}>{user?.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
