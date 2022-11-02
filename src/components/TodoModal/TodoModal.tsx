import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TODO_ACTIONS, TODO_SELECTORS } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { LOADING_ACTIONS, LOADING_SELECTORS } from '../../features/loading';

export const TodoModal: React.FC = () => {
  const selectedTodo = useSelector(TODO_SELECTORS.getCurrentTodo);

  const dispatch = useDispatch();
  const isLoading = useSelector(LOADING_SELECTORS.getTodoLoadingStatus);

  const setIsLoading = (status: boolean) => {
    dispatch(LOADING_ACTIONS.setTodoLoading(status));
  };

  const handleDeselectTodo = () => dispatch(TODO_ACTIONS.removeTodo());

  const [foundUser, setFoundUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setFoundUser)
        .finally(() => setIsLoading(false));
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading || !selectedTodo || !foundUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectedTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => handleDeselectTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            {foundUser && (
              <p className="block" data-cy="modal-user">
                {selectedTodo.completed ? (
                  <strong className="has-text-success">Done</strong>
                ) : (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {' by '}

                <a href={`mailto:${foundUser.email}`}>
                  {foundUser.name}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
