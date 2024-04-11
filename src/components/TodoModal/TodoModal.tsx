import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(currentTodoActions.removeTodo());

  const loadUser = useCallback(async () => {
    try {
      setLoader(true);
      if (currentTodo) {
        const fetchUser = await getUser(currentTodo.userId);

        setUser(fetchUser);
      }

      setLoader(false);
    } catch (error) {
      setErrorMsg(`Error fetching user:, ${error}`);
    } finally {
      setLoader(false);
    }
  }, [currentTodo]);

  useEffect(() => {
    loadUser();
  }, [currentTodo, loadUser]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {errorMsg && <div className="error">{errorMsg}</div>}
      {loader ? (
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
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
