import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterTodo } from '../../features/filterTodo';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(filterTodo.getFilteredTodos);
  const dispatch = useAppDispatch();

  const removeCurrentTodo = () => {
    dispatch(actions.removeTodo());
  };

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId).then((user) => setCurrentUser(user));
    }
  }, [currentTodo]);

  const findTodo = todos.find(todo => {
    return todo.id === currentTodo?.id;
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeCurrentTodo}
              aria-label=" "
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {findTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text-${findTodo?.completed ? 'success' : 'danger'}`}
              >
                {findTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href="mailto:Sincere@april.biz">
                {currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
