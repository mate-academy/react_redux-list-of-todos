import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  selectedItem: Todo
  setSelectedItem: (todo: null) => void,
};

export const TodoModal: React.FC<Props> = ({
  selectedItem,
  setSelectedItem,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selectedItem.userId).then(setUser);
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedItem.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setSelectedItem(null)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedItem.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              {selectedItem.completed
                ? (
                  <strong
                    className="has-text-success"
                  >
                    Done
                  </strong>
                )
                : (
                  <strong
                    className="has-text-danger"
                  >
                    Planned
                  </strong>
                )}

              {' by '}

              <a href={`mailto:${user.email}`}>
                {user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
