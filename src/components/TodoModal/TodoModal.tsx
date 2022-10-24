import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';

import { Loader } from '../Loader';
import { getUser } from '../../api';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  currentTodo: Todo,
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  const removeCurrentTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    setIsLoading(true);

    getUser(currentTodo.userId)
      .then((response) => {
        setCurrentUser(response);
      })
      .catch(() => {
        throw new Error('Error on user loading');
      })
      .finally(() => setIsLoading(false));
  }, []);

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
              Todo #
              {currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeCurrentTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo.title}</p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
