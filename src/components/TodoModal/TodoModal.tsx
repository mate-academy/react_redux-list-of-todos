import React, { useEffect } from 'react';
import classNames from 'classnames';

import { Loader } from '../Loader';

import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';

type Props = {
  userInfo: User | null;
  setUserInfo: React.Dispatch<React.SetStateAction<User | null>>;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoModal: React.FC<Props> = ({
  userInfo,
  setUserInfo,
  selectedTodo,
  setSelectedTodo,
}) => {
  useEffect(() => {
    if (selectedTodo?.userId) {
      getUser(selectedTodo.userId).then(setUserInfo);
    }
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!userInfo || !selectedTodo ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setSelectedTodo(null);
                setUserInfo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames({
                  'has-text-danger': !selectedTodo.completed,
                  'has-text-success': selectedTodo.completed,
                })}
              >
                {selectedTodo.completed
                  ? 'Done'
                  : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${userInfo.email}`}>
                {userInfo.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
