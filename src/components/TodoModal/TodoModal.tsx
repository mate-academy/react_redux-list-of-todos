import { useEffect, useState } from 'react';
import { Loader } from '..';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector<RootState>(
    state => state.currentTodo,
  ) as Todo;
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getUser(selectedTodo.userId)
      .then(setCurrentUser)
      .finally(() => setIsLoading(false));
  }, [selectedTodo.userId]);

  const closeTodoModal = () =>
    dispatch(currentTodoSlice.actions.setCurrentTodo(null));

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
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeTodoModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text-${selectedTodo.completed ? 'success' : 'danger'}`}
              >
                {selectedTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
