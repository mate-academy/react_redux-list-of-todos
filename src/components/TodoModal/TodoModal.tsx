import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

interface Props {
  todo: Todo,
}

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  const onCloseButtonClick = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  useEffect(() => {
    setIsLoaded(false);
    getUser(todo.userId).then(data => {
      setUser(data);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoaded ? (
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
              onClick={onCloseButtonClick}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{todo.title}</p>

            <p className="block" data-cy="modal-user">
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>

              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />

      )}
    </div>
  );
};
