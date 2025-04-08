import React from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  userName?: string;
  userEmail?: string;
}

export const ModalBody: React.FC<Props> = ({ todo, userName, userEmail }) => (
  <div className="modal-card-body">
    <p className="block" data-cy="modal-title">
      {todo.title}
    </p>

    <p className="block" data-cy="modal-user">
      {todo.completed ? (
        <>
          <strong className="has-text-success">Done</strong>
          {' by '}
          <a href={`mailto:${userEmail}`}>{userName}</a>
        </>
      ) : (
        <>
          <strong className="has-text-danger">Planned</strong>
          {userName && (
            <>
              {' by '}
              <a href={`mailto:${userEmail}`}>{userName}</a>
            </>
          )}
        </>
      )}
    </p>
  </div>
);
