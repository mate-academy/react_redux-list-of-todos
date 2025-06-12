import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedTodo?: Todo;
  setSelectedTodo: (todo: Todo | undefined) => void;
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setSelectedTodo,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [targetUser, setTargetUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedTodo) {
        return;
      }

      setIsLoading(true);

      try {
        const user = await getUser(selectedTodo.userId);

        setTargetUser(user);
      } catch {
        alert('Failed to fetch user:');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [selectedTodo]);

  return (
    <>
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo {`#${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
                  {selectedTodo?.title}
                </p>
                <p className="block" data-cy="modal-user">
                  {selectedTodo?.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                  {' by '}
                  <a href={`mailto:${targetUser?.email}`}>{targetUser?.name}</a>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
