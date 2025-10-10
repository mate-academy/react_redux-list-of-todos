import React, { useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type TodoModalProps = {
  selectedTodo: Todo | null;
  onClose: () => void;
};

export const TodoModal: React.FC<TodoModalProps> = ({
  selectedTodo,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function getUserTodoData() {
      if (selectedTodo) {
        setIsLoading(true);
        setUser(null);

        try {
          const userData = await getUser(selectedTodo.userId);

          if (!isCancelled) {
            setUser(userData);
          }
        } catch (error) {
        } finally {
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      } else {
        setUser(null);
      }
    }

    getUserTodoData();

    return () => {
      isCancelled = true;
    };
  }, [selectedTodo]);

  function handleClose() {
    onClose();
  }

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
              Todo #{selectedTodo?.id}
            </div>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClose}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>
          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>
            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
