import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

interface PropsTodo {
  chousenTodo: Todo | null;
  chooseTodo(selectedTodo: Todo | null): void;
}

export const TodoModal: React.FC<PropsTodo> = ({ chousenTodo, chooseTodo }) => {
  const [user, setUser] = useState<User>();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClicked(true);
    }, 300);
  }, [setIsClicked]);

  const handleModaleClose = () => {
    chooseTodo(null);
    setIsClicked(false);
  };

  const handleClickOnEmail = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (chousenTodo) {
      getUser(chousenTodo.userId).then(setUser);
    }
  }, [chousenTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isClicked ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${chousenTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleModaleClose}
              type="button"
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {`${chousenTodo?.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  chousenTodo?.completed
                    ? 'has-text-success'
                    : 'has-text-danger'
                }
              >
                {chousenTodo?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a
                onClick={handleClickOnEmail}
                href={user?.email}
              >{`${user?.name}`}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
