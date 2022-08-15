import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../types/User';

import { Loader } from '../Loader';
import { getUser } from '../../api';
import { selectors } from '../../store';
import { ModalTodoActions } from '../../store/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const todo = useSelector(selectors.getTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      getUser(todo.userId)
        .then(person => {
          setUser(person);
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? <Loader />
        : todo && (
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
                onClick={() => dispatch(ModalTodoActions.unselectTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {todo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                {todo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                {user && (
                  <a href={`mailto:${user.email}`}>
                    {user.name}
                  </a>
                )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
