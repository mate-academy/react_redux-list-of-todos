/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<User | null>(null);
  const openedTodo = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    let isComponentChosen = true;

    const fetchData = async () => {
      try {
        if (openedTodo?.userId) {
          const person = await getUser(openedTodo.userId);

          if (isComponentChosen) {
            setUserData(person);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        if (isComponentChosen) {
          isComponentChosen = false;
        }
      }
    };

    fetchData();

    return () => {
      if (isComponentChosen) {
        isComponentChosen = false;
      }
    };
  }, [openedTodo]);

  const handleClose = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {userData ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${openedTodo?.id}`}
            </div>

            <button
              aria-label="Close Modal"
              type="button"
              className="delete"
              onClick={() => handleClose()}
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{openedTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {openedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}
              {' by '}
              <a href={`mailto:${userData?.email}`}>{userData?.name}</a>
            </p>
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
};
