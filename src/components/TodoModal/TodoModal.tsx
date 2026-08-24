import React, { useState, useEffect } from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';

type Props = {
  selectedobj: Todo;
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ selectedobj, onClose }) => {
  const [newobj, setObj] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUser(selectedobj.userId)
      .then(fetchedUser => setObj(fetchedUser))
      .finally(() => setLoading(false));
  }, [selectedobj.userId]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={onClose} />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedobj.id}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedobj.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedobj.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              {newobj && <a href={`mailto:${newobj.email}`}>{newobj.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
