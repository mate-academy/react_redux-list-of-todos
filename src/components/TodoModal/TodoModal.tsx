import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

const getUserNameByTodo = (user: User | null): string => {
  return user ? user.name : 'Unknown User';
};

export const TodoModal: React.FC = () => {
  const [loader, setLoader] = useState(true);

  const [modalIsActive, setModalIsActive] = useState(false);
  const [bgActive, setBgActive] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState('');

  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const onClose = () => dispatch(currentTodoSlice.actions.deleteTodo());

  useEffect(() => {
    setLoader(true);
    if (todo) {
      getUser(todo.userId)
        .then(loadUser => {
          setUser(loadUser);
        })
        .finally(() => {
          setLoader(false);
          setModalIsActive(true);
        });
    }
  }, [todo]);

  useEffect(() => {
    setSelectedUser(getUserNameByTodo(user));
  }, [user]);

  const handleCloseButton = () => {
    setBgActive(false);
    onClose();
  };

  const { title, id, completed } = todo || {};

  return (
    <div className={cn('modal', { 'is-active': bgActive })} data-cy="modal">
      <div className="modal-background" onClick={handleCloseButton} />
      {loader ? (
        <Loader />
      ) : (
        modalIsActive && (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={handleCloseButton}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={cn({
                    'has-text-success': completed,
                    'has-text-danger': !completed,
                  })}
                >
                  {completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${user?.email || ''}`}>{selectedUser}</a>
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};
