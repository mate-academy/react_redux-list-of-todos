import { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { setUserFromApiById } from '../../utils/setUserFromApiById';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal = () => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const selectedTodoDispatch = useAppDispatch();

  const changeCurrentTodo = useCallback(
    (newTodos: Todo | null) => {
      selectedTodoDispatch(
        currentTodoSlice.actions.changecurrentTodo(newTodos),
      );
    },
    [selectedTodoDispatch],
  );

  useEffect(() => {
    if (selectedTodo !== null) {
      setUserFromApiById(selectedTodo.userId, setUser, setIsLoading);
    }
  }, [selectedTodo]);

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
              Todo #{selectedTodo?.id || 0}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => changeCurrentTodo(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title || ''}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={
                  selectedTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {selectedTodo?.completed ? 'Done' : 'Planned'}
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
