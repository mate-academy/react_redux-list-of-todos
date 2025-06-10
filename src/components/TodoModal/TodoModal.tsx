import React from 'react';
import { Loader } from '../Loader';
import { Todo } from '../../types/Todo';

type Props = {
  loader: boolean;
  actualUser: Todo;
  setModalClose: (pr: boolean) => void;
};

export const TodoModal: React.FC<Props> = ({ loader, setModalClose, actualUser }) => {
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loader ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium" data-cy="modal-header">
              {`Todo #${actualUser.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setModalClose(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {actualUser.title}
            </p>

            <p className="block" data-cy="modal-user">
              <strong className="has-text-danger">Planned</strong> {' by '}
              <a href="mailto:Sincere@april.biz">Leanne Graham</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
