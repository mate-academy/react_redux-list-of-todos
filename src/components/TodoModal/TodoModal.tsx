import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';
import { actionsWithTodoID } from '../../features/currentTodoID';

export const TodoModal: React.FC = () => {
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const currentTodoID = useAppSelector(state => state.currentTodoID);
  const todoToShow = useAppSelector(
    state => (state.todos.find(todo => todo.id === currentTodoID) || null),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setIsTodoLoading(true);
    getUser(todoToShow?.userId || 0)
      .then(res => setUser(res))
      .finally(() => setIsTodoLoading(false));
  }, []);

  return (
    <div
      className="modal is-active"
      data-cy="modal"
    >
      <div className="modal-background" />

      {isTodoLoading
        ? <Loader />
        : user && todoToShow && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {currentTodoID}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(actionsWithTodoID.remove())}
              />
            </header>

            <div className="modal-card-body">
              <p
                className="block"
                data-cy="modal-title"
              >
                {todoToShow.title}
              </p>

              <p
                className="block"
                data-cy="modal-user"
              >
                {todoToShow.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}
                {' by '}
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
