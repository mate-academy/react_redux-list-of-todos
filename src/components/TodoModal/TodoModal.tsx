import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loader } from '../Loader';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../types/User';
import { getUser } from '../../api';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    id: 0,
    phone: '',
  });
  const [userLoading, setUserLoading] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);

  const setClearCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);

      try {
        if (currentTodo) {
          const fetchedUser = await getUser(currentTodo?.userId);

          setUser(fetchedUser);

          setIsErrorShown(false);
        }
      } catch {
        setIsErrorShown(true);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [currentTodo]);

  const handleClearError = () => {
    setIsErrorShown(false);
    setClearCurrentTodo();
  };

  return (
    <div
      className={cn('modal', {
        'is-active': !!currentTodo?.id,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isErrorShown && (
        <div className="notification is-danger is-light">
          <button className="delete" onClick={handleClearError} />
          User couldn&apos;t be loaded, check your connection
        </div>
      )}

      {userLoading && <Loader />}

      {!userLoading && !isErrorShown && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo?.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={setClearCurrentTodo}
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
              <a href={`mailto:${user.email}`}>{user.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
