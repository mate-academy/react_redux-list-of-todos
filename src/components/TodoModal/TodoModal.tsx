import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { Loader } from '../Loader/Loader';
import { User } from '../../types/User';

type Props = {
  inUse: boolean;
  setInUse: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoModalUse: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({
  inUse,
  setInUse,
  setTodoModalUse,
}) => {
  const todo = useAppSelector(state => state.currentTodo);
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!todo) {
      return;
    }

    let isActive = true;

    setLoader(true);
    setUser(null);

    getUser(todo.userId).then(fetchedUser => {
      if (!isActive) {
        return;
      }

      setUser(fetchedUser);
      setLoader(false);
    });

    return () => {
      isActive = false;
    };
  }, [todo]);

  return (
    <>
      {inUse && todo && (
        <div className="modal is-active" data-cy="modal">
          <div className="modal-background" />
          {loader && <Loader />}

          {!loader && user && (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${todo.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={() => {
                    setInUse(false);
                    setTodoModalUse(false);
                  }}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {todo.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {todo.completed ? (
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
      )}
    </>
  );
};
