import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { actions as removeAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  currentTodo: Todo | null;
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<User>();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then((todo: User) => {
          setCurrentUser(todo);
        })
        .finally(() => {
          setLoader(false);
        });
    }
  }, [currentTodo]);

  const handleRemoveTodo = () => {
    dispatch(removeAction.removeTodo());
  };

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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={handleRemoveTodo}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}

              {' by '}

              <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
