import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { actions } from '../../store';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todos: Todo[],
  resetTodoId: () => void,
  selectTodoId: number,
};

export const TodoModal: React.FC<Props> = ({
  todos,
  resetTodoId,
  selectTodoId,
}) => {
  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();

  const currentTodo = todos.find(td => td.id === selectTodoId);
  const currentUserId = currentTodo?.userId || 0;

  if (currentTodo) {
    const action = actions.todoActions.setTodos(currentTodo);

    dispatch(action);
  }

  useEffect(() => {
    getUser(currentUserId)
      .then(userFromServer => setUser(userFromServer));
  }, [currentUserId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={resetTodoId}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
