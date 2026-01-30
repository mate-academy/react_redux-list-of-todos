import React from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { clearCurrentTodo } from '../../features/currentTodo';

type Props = {
  isLoading: boolean;
};

export const TodoModal: React.FC<Props> = ({ isLoading }) => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const todos = useSelector((state: RootState) => state.todos);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);

  const filteredTodos = todos
    .filter(
      todo =>
        status === 'all' ||
        (status === 'active' ? !todo.completed : todo.completed),
    )
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const todoNumber: number | null = currentTodo
    ? filteredTodos.indexOf(currentTodo) + 1
    : null;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      {user && currentTodo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todoNumber}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(clearCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
