import React, { useCallback } from 'react';
import { Loader } from '../Loader';
import { useFetch } from '../hooks/useFetch';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/store';
import { getUser } from '../../api';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const todo = useAppSelector(state => state.currentTodo) as Todo;
  const dispatch = useDispatch();
  const { setCurrentTodo } = currentTodoSlice.actions;
  const fetchUser = useCallback(() => {
    return todo ? getUser(todo.userId) : Promise.resolve({} as User);
  }, [todo]);

  const {
    data: user,
    errorMessage,
    isLoading,
  } = useFetch<User>(fetchUser, {} as User);

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
              Todo #{todo?.id}
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
              {todo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {!errorMessage && user && (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              )}
              {errorMessage && !user && <p>Could&apos;t fetch user</p>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
