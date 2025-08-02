import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const todo = useSelector((state: RootState) => state.currentTodo);
  const completed = todo?.completed;
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!todo) {
      return;
    }

    setLoading(true);
    getUser(todo.userId)
      .then(setUser)
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1000),
      );
  }, [todo]);

  if (!todo) {
    return null;
  }

  if (userLoading) {
    return (
      <div className="modal is-active" data-cy="modal">
        <div className="modal-background" />
        <Loader />
      </div>
    );
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div
        className="modal-background"
        onClick={() => dispatch(setCurrentTodo(null))}
      />

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(setCurrentTodo(null))}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {!completed ? (
              <strong className="has-text-danger">Planned</strong>
            ) : (
              <strong className="has-text-success">Done</strong>
            )}
            {' by '}
            <a href="mailto:Sincere@april.biz">{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
