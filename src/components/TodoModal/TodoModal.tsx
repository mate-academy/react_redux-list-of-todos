import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getTodos, getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState<User | null>(null);
  const [currentTodoObject, setCurrentTodoObject] = useState<Todo | null>(null);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then((user: User) => setAuthor(user))
        .finally(() => setIsLoading(false));

      getTodos().then(todos =>
        setCurrentTodoObject(
          todos.find(todo => todo.id === currentTodo.id) ?? null,
        ),
      );
    }
  }, [currentTodo]);

  const handleRemoveTodo = () => dispatch(currentTodoActions.removeTodo());

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
              Todo #{currentTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleRemoveTodo}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodoObject?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodoObject?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${author?.email}`}>{author?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
