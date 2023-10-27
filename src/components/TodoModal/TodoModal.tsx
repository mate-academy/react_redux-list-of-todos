import React, { useContext, useEffect, useState } from 'react';

import { Loader } from '../Loader';
import { getUser } from '../../utils/api';
import { User } from '../../types/User';
import { TodosContext } from '../TodosContext';

export const TodoModal: React.FC = () => {
  const { shownTodo, setShownTodo } = useContext(TodosContext);

  const [isLoading, setIsLoading] = useState(false);
  const [shownUser, setShownUser] = useState<User | null>(null);

  useEffect(() => {
    if (shownTodo) {
      setIsLoading(true);

      getUser(shownTodo.userId)
        .then(setShownUser)
        .finally(() => setIsLoading(false));
    }
  }, [shownTodo]);

  const handleRemoveButton = () => {
    setShownTodo(null);
  };

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
              {`Todo #${shownTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleRemoveButton}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {shownTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {shownTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={shownUser?.email}>
                {shownUser?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
