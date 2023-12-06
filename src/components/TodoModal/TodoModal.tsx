import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);

  const selectedTodo = todos.find(todo => todo.id === currentTodo?.id);

  useEffect(() => {
    if (selectedTodo) {
      setIsLoading(true);
      getUser(selectedTodo.userId)
        .then(response => setUser(response))
        .finally(() => setIsLoading(false));
    }
  }, [selectedTodo]);

  const handleDeleteModal = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleDeleteModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{selectedTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {/* For completed */}
              {selectedTodo?.completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
