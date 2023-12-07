import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoading(true);

    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(data => setUser(data))
        .catch(() => {
          throw new Error('error');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [selectedTodo]);

  const renderTodoHeader = () => {
    if (selectedTodo) {
      return `Todo #${selectedTodo.id}`;
    }

    return '';
  };

  const renderTodoTitle = () => {
    if (selectedTodo) {
      return selectedTodo.title || '';
    }

    return '';
  };

  const renderTodoStatus = () => {
    if (selectedTodo) {
      return selectedTodo.completed ? (
        <strong className="has-text-success">Done</strong>
      ) : (
        <strong className="has-text-danger">Planned</strong>
      );
    }

    return null;
  };

  const renderTodoUser = () => {
    if (selectedTodo) {
      return (
        <>
          {renderTodoStatus()}
          {' '}
          by
          {' '}
          <a href={user?.email}>{user?.name || ''}</a>
        </>
      );
    }

    return null;
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                <span>{renderTodoHeader()}</span>
              </div>
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(actions.removeTodo())}
                aria-label="label"
              />
            </header>
            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {renderTodoTitle()}
              </p>
              <p className="block" data-cy="modal-user">
                {renderTodoUser()}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
