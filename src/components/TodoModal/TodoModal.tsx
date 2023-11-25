import React, { useEffect, useState } from 'react';

import { useAppDispatch } from '../../app/hooks';

import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  selectedTodo: Todo,
  setIsModalShowed: (param: boolean) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedTodo,
  setIsModalShowed,
}) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const {
    id,
    title,
    completed,
    userId,
  } = selectedTodo;

  useEffect(() => {
    setIsLoading(true);

    getUser(userId)
      .then(response => setSelectedUser(response))
      .finally(() => setIsLoading(false));
  }, [userId]);

  const { name, email } = selectedUser || {};

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {!isLoading && selectedUser && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(currentTodoActions.removeTodo());
                setIsModalShowed(false);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${email}`}>
                {name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
