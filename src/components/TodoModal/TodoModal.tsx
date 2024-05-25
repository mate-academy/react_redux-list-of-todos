import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';

import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { action } from '../../features/selectedTodo';

export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [isClicked, setIsClicked] = useState(false);

  const selected = useAppSelector<Todo | null>(state => state.selected);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsClicked(true);
    }, 300);
  }, [setIsClicked]);

  const handleModaleClose = () => {
    dispatch(action.setSelected(null));
    setIsClicked(false);
  };

  const handleClickOnEmail = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (selected) {
      getUser(selected?.userId).then(setUser);
    }
  }, [selected]);

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
              {`Todo #${selected?.id}`}
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
              {`${selected?.title}`}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={
                  selected?.completed ? 'has-text-success' : 'has-text-danger'
                }
              >
                {selected?.completed ? 'Done' : 'Planned'}
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
