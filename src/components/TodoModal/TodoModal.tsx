import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as currentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const setTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (setTodo) {
      getUser(setTodo.id).then(setUser);
    }
  }, [setTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {user
        ? (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${setTodo?.id}`}
              </div>
              <button
                aria-label="close"
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(currentTodo.removeTodo())}
              />
            </header>
            <div className="modal-card-body">
              <p
                className="block"
                data-cy="modal-title"
              >
                {setTodo?.title}
              </p>
              <p className="block" data-cy="modal-user">
                {setTodo?.completed
                  ? (
                    <strong className="has-text-success">
                      Done
                    </strong>
                  )
                  : (
                    <strong className="has-text-danger">
                      Planned
                    </strong>
                  )}
                {' by '}
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )
        : (<Loader />)}
    </div>

  );
};
