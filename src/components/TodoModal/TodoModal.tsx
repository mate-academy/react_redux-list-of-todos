import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async (id: number) => {
      try {
        setIsLoading(true);
        const data = await getUser(id);

        if (!data) {
          return;
        }

        setUser(data);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentTodo) {
      fetchUser(currentTodo.userId);
    }
  }, [currentTodo]);

  if (!currentTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo
            {' '}
            {currentTodo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(actions.removeTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{currentTodo.title}</p>

          <p className="block" data-cy="modal-user">
            <strong className={cn({
              'has-text-success': currentTodo,
              'has-text-danger': !currentTodo,
            })}
            >
              {currentTodo.completed ? 'Done' : 'Planned'}
            </strong>
            {currentTodo.completed
              && (
                <>

                  {' by '}
                  <a href={`mailto:${user?.email}`}>Leanne Graham</a>
                </>
              )}

          </p>
        </div>
      </div>
    </div>
  );
};
