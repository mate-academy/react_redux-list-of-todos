import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();

  const [selectedTodoUser, setSelectedTodoUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const selectedTodo = useAppSelector(state => state.currentTodo);
  const removeCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(result => {
          setSelectedTodoUser(result);
          setIsUserLoading(false);
        });
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isUserLoading
        ? <Loader />
        : (
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
                onClick={() => removeCurrentTodo()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}
                <a href={`mailto:${selectedTodoUser?.email}`}>
                  {selectedTodoUser?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
