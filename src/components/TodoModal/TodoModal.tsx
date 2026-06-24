/* eslint-disable no-console */

//hooks
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { useDispatch } from 'react-redux';

//components
import { Loader } from '../Loader';

//api
import { getUser } from '../../api';

//types
import { User } from '../../types/User';

//store
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      if (!currentTodo) {
        return;
      }

      try {
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const data = await getUser(currentTodo.userId);

        setUser(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [currentTodo]);

  return (
    <>
      {isLoading && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
          <Loader />
        </div>
      )}
      {currentTodo && !isLoading && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />

          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{currentTodo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(actions.clear())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {currentTodo.completed === false ? (
                  <strong className="has-text-danger">Planned</strong>
                ) : (
                  <strong className="has-text-success">Done</strong>
                )}

                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
