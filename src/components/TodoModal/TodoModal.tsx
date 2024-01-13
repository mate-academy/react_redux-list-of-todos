import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTodo } = useAppSelector(state => state);
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo && 'id' in currentTodo) {
      getUser(currentTodo?.id)
        .then(setAuthor);
    }
  }, [currentTodo]);

  const handleModalClose = () => dispatch(actions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {
        author
          ? (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${currentTodo?.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={handleModalClose}
                />
              </header>

              <div className="modal-card-body">
                <p
                  className="block"
                  data-cy="modal-title"
                >
                  {currentTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {
                    currentTodo?.completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>
                  }
                  {' by '}
                  <a href={`mailto:${author.email}`}>{author.name}</a>
                </p>
              </div>
            </div>
          )
          : <Loader />
      }
    </div>
  );
};
