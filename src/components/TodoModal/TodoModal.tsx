import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { RootState } from '../../app/store';

export const TodoModal = () => {
  const [user, setUser] = useState<User | undefined>();

  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);
  const todos = useAppSelector((state: RootState) => state.todos) as Todo[];

  const dispatch = useAppDispatch();

  const selectedTodo = todos.find((todo: Todo) => {
    return todo.id === currentTodo?.id;
  });
  const removeTodo = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setUser);
    }
  }, [currentTodo?.id]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user && currentTodo?.id ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setUser(undefined);
                removeTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              {user && (
                <a href={`mailto:${user.email}`}>
                  {user.name}
                </a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
