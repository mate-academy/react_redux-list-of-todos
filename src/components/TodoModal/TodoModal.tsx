import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { actions, currentTodoSelector } from '../../features/currentTodo';
import { useAppSelector } from '../../app/store';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const currentTodo = useAppSelector(currentTodoSelector) as Todo;
  const dispatch = useDispatch();

  useEffect(() => {
    getUser(currentTodo.userId)
      .then(fetchedUser => {
        setUser(fetchedUser);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentTodo.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => dispatch(actions.set(null))}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  currentTodo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {currentTodo.completed ? 'Done' : 'Planned'}
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
