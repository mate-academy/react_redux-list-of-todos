/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

import { getUser } from '../../api';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  actions as currentTodoActions,
  todoSelector,
} from '../../features/currentTodo';

import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const selectedTodo = useAppSelector(todoSelector.getCurrentTodo);
  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(currentTodoActions.removeTodo());

  const getUserFromServer = async (userId: number) => {
    try {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    } catch (err: any) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (selectedTodo) {
      getUserFromServer(selectedTodo?.userId);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {
        !user
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
                  onClick={closeModal}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {!selectedTodo?.completed
                    ? <strong className="has-text-danger">Planned</strong>
                    : (
                      <>
                        <strong className="has-text-success">Done</strong>
                        {' by '}
                        <a href={`mailto:${user?.email}`}>
                          {user?.name}
                        </a>
                      </>
                    )}
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
