import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentUserActions } from '../../features/currentUser';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
};

export const TodoModal: React.FC<Props> = ({ todo }) => {
  const {
    title, id, completed, userId,
  } = todo;
  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useAppDispatch();
  const currentUser: User = useAppSelector(state => state.currentUser);

  const loadUserData = async () => {
    try {
      setIsLoader(true);
      const loadedDataUser = await getUser(userId);

      dispatch(currentUserActions.setUser(loadedDataUser));
    } catch (error) {
      throw Error('Failed to load user data');
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const onModalRemove = () => {
    dispatch(currentUserActions.removeUser());
    dispatch(currentTodoActions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onModalRemove}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">

              {completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}
              <a href="mailto:Sincere@april.biz">
                {currentUser ? currentUser.name : 'User'}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
