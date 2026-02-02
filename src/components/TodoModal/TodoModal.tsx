import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setLoading, setUser, setClose } from '../../features/currentTodo';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const { todo, isOpen, isLoading, user } = useAppSelector(
    state => state.currentTodo,
  );

  useEffect(() => {
    if (todo) {
      dispatch(setLoading(true));
      getUser(todo.userId)
        .then(userData => {
          dispatch(setUser(userData));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [todo, dispatch]);

  if (!isOpen) {
    return null;
  }

  const removeTodoModal = () => dispatch(setClose());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading || !todo ? (
        <Loader />
      ) : (
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
              onClick={removeTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  todo.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {todo.completed ? 'Done' : 'Planned'}
              </strong>
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
