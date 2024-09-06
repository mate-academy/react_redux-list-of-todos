import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  closeModal: () => void;
};

export const TodoModal: React.FC<Props> = ({ todo, closeModal }) => {
  const [todoOwner, setTodoOwner] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const findUser = useCallback(() => {
    setIsLoading(true);
    getUser(todo.userId)
      .then(setTodoOwner)
      .catch(error => {
        alert(error);
        setTodoOwner(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [todo.userId]);

  useEffect(() => {
    findUser();
  }, [findUser]);

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
              Todo #{todo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!todo.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}

              <a href={`mailto:${todoOwner?.email}`}>{todoOwner?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
