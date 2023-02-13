import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);

  const {
    id,
    title,
    completed,
    userId,
  } = currentTodo as Todo;

  const loadUser = async () => {
    try {
      const loadedUser = await getUser(userId);

      setUser(loadedUser);
    } catch {
      throw new Error('Something was wrong with your internet connection');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const deleteSelectedTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

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
              {`Todo #${id}`}
            </div>

            <button
              type="button"
              aria-label="Mute volume"
              className="delete"
              data-cy="modal-close"
              onClick={() => deleteSelectedTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>

            <p className="block" data-cy="modal-user">
              {completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
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
