import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | undefined>>;
  selectedTodo: Todo | undefined;
};

export const TodoModal: React.FC<Props> = ({
  setSelectedTodo,
  selectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedTodo?.userId) {
        return;
      }

      setIsLoading(true);

      try {
        const user = await getUser(selectedTodo.userId);

        setCurrentUser(user);
      } catch {
        // Optional: handle error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [selectedTodo?.userId]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal-card" data-cy="modal">
      <header className="modal-card-head">
        <div
          className="modal-card-title has-text-weight-medium"
          data-cy="modal-header"
        >
          Todo #{selectedTodo.id}
        </div>
        <button
          type="button"
          className="delete"
          data-cy="modal-close"
          onClick={() => setSelectedTodo(undefined)}
        />
      </header>

      <div className="modal-card-body">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>
            <p className="block" data-cy="modal-user">
              {selectedTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
