import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { deleteCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User>();

  const todo = useAppSelector(store => store.currentTodo);
  const dispatch = useAppDispatch();

  const findUser = async (id: number | undefined) => {
    try {
      if (id) {
        const searchableUser = await getUser(id);

        setUser(searchableUser);
        setLoader(false);
      }
    } catch {
      throw new Error('Error when searching for user');
    }
  };

  useEffect(() => {
    findUser(todo?.userId);
  }, [todo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(deleteCurrentTodo())}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong
                className={`has-text-${todo?.completed ? 'success' : 'danger'}`}
              >
                {!todo?.completed ? 'Planned' : 'Done'}
              </strong>

              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
