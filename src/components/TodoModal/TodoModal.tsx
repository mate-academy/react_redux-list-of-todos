import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  function removeCurrentTodo() {
    dispatch(currentTodoActions.removeTodo());
    setUser(null);
  }

  async function loadUser(todo: Todo) {
    const loadedUser = await getUser(todo.id);

    setUser(loadedUser);
  }

  useEffect(() => {
    if (currentTodo) {
      loadUser(currentTodo);
    }
  }, [currentTodo]);

  return (
    <div
      className={
        classNames(
          'modal',
          { 'is-active': currentTodo },
        )
      }
      data-cy="modal"
    >
      <div className="modal-background" />

      {user === null ? (<Loader />) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={removeCurrentTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!currentTodo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {currentTodo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>{user.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
