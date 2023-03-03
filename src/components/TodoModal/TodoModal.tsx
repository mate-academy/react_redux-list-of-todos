import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';

import { useAppDispatch } from '../../app/hooks';

import {
  actions as currentTodoActions,
} from '../../features/currentTodo/actions';
import { getUser } from '../../api';

import { Todo } from '../../types/Todo';
import { OptionalUser } from '../../types/OptionalUser';

type Props = {
  todo: Todo;
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch();

  const [user, setUser] = useState<OptionalUser>(null);

  useEffect(() => {
    getUser(todo.userId).then((u) => {
      setUser(u);
    });
  }, []);

  const handleCloseModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleCloseModal}
              aria-label="Press Enter to close the modal window"
            />
          </header>

          <div className="modal-card-body">
            <p
              className="block"
              data-cy="modal-title"
            >
              {todo.title}
            </p>

            <p
              className="block"
              data-cy="modal-user"
            >
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
