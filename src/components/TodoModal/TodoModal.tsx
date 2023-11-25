/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const modalTodo = useAppSelector((state) => state.currentTodo);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (modalTodo?.userId) {
          const person = await getUser(modalTodo.userId);

          if (isMounted) {
            setUser(person);
          }
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [modalTodo]);

  const handleClose = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${modalTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              onClick={() => handleClose()}
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{modalTodo?.title}</p>

            <p className="block" data-cy="modal-user">

              {modalTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : <Loader />}
    </div>
  );
};
