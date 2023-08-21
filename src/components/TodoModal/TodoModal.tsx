import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoFeat } from '../../features/currentTodo';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<Pick<User, 'email' | 'name'>>(
    { email: '', name: '' },
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { email, name } = user;

  useEffect(() => {
    const getCurentUser = async () => {
      if (!currentTodo) {
        return;
      }

      try {
        setIsLoading(true);
        const res = await getUser(currentTodo.userId);

        setUser(res);
      } catch (error) {
        throw new Error('Error');
      } finally {
        setIsLoading(false);
      }
    };

    getCurentUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? <Loader />
        : currentTodo && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {currentTodo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(currentTodoFeat.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{currentTodo.title}</p>

              <p className="block" data-cy="modal-user">
                {!currentTodo.completed
                  ? <strong className="has-text-danger">Planned</strong>
                  : <strong className="has-text-success">Done</strong>}
                {' by '}
                <a href={`mailto:${email}`}>{`${name}`}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
