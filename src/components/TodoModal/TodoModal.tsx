import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(todo.userId)
      .then(res => {
        setUser(res);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        && <Loader />}

      {!isLoading && user
        && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  dispatch(currentTodoActions.removeTodo());
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{todo.title}</p>

              <p className="block" data-cy="modal-user">
                {!todo.completed
                && <strong className="has-text-danger">Planned</strong>}

                {todo.completed
                && <strong className="has-text-success">Done</strong>}
                {' by '}
                <a href={user.email}>{user.name}</a>
              </p>
            </div>
          </div>
        )}

    </div>
  );
};
