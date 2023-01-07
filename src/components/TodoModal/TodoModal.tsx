import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  const removeTodo = () => dispatch(currentTodoActions.removeTodo());

  const loadUser = async () => {
    if (todo) {
      const loadedUser = await getUser(todo?.userId);

      setUser(loadedUser);
    }
  };

  useEffect(() => {
    loadUser();
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && (<Loader />)}

      {user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{todo?.title}</p>

            <p className="block" data-cy="modal-user">

              {todo?.completed && (
                <strong className="has-text-success">Done by </strong>)}

              {!todo?.completed && (
                <strong className="has-text-danger">Planned by </strong>)}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
