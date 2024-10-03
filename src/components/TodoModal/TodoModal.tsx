import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';

import { getUser } from '../../api';
import { RootState } from '../../app/store';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispath = useDispatch();
  const todo = useSelector((state: RootState) => state.currentTodo.todo);
  const [user, setUser] = useState<User | null>(null);

  const handleCloseModal = () => {
    dispath(setCurrentTodo(null));
    setUser(null);
  };

  useEffect(() => {
    if (todo) {
      getUser(todo.userId).then(response => setUser(response));
    }
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        todo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{todo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseModal}
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
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
