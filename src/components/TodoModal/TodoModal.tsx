import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [selectedUser, setSelectedUser] = useState<User | null>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const dispatch = useDispatch();
  const { removeTodo } = actions;

  async function loadUser() {
    setIsloading(true);
    try {
      const user = await getUser((currentTodo as Todo).userId);

      setSelectedUser(user);
    } catch {
      setIsError(true);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && (
        <Loader />
      )}

      {!isLoading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                dispatch(removeTodo());
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              <strong
                className={cn(
                  { 'has-text-danger': !currentTodo?.completed },
                  { 'has-text-success': currentTodo?.completed },
                )}
              >
                {currentTodo?.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>
              {' by '}
              {!isError && (
                <a href={`mailto:${selectedUser?.email}`}>{selectedUser?.name}</a>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
