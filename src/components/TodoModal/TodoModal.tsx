import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { store } from '../../app/store';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { actions as loadingActions } from '../../features/loading';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const currentTodoId = useAppSelector(state => state.currentTodo);
  const currentTodo = useAppSelector(state => state.todos
    .find(todo => todo.id === currentTodoId));
  const isLoading = useAppSelector(state => state.loading.modalLoading);
  const [user, setUser] = useState<User | null>(null);

  if (!currentTodo) {
    throw new Error();
  }

  useEffect(() => {
    try {
      getUser(currentTodo.userId)
        .then(res => {
          setUser(res);
          store.dispatch(loadingActions.setModalIsNOTLoading());
        })
        .catch(() => {
          throw new Error('No such user');
        });
    } catch (error) {
      store.dispatch(currentTodoActions.removeTodo());
    }

    return () => {
      store.dispatch(loadingActions.setModalIsLoading());
    };
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodoId}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                store.dispatch(currentTodoActions.removeTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo.title}</p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
