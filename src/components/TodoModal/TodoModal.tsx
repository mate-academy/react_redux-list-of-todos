import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  if (!todo) {
    throw new Error('There is no todo');
  }

  useEffect(() => {
    setLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .finally(() => setLoading(false));
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {(loading || !user) ? (
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
              onClick={() => dispatch(currentTodoActions.removeTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {
                todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )
              }

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
