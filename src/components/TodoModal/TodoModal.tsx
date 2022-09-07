import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { TODO_ACTIONS } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectTodo: Todo;
}

export const TodoModal: React.FC<Props> = (props) => {
  const { selectTodo } = props;
  const [user, setUser] = useState<User | null>(null);
  const [isLoadedUser, setIsLoadedUser] = useState(false);

  const dispach = useDispatch();

  useEffect(() => {
    if (selectTodo !== null) {
      getUser(selectTodo.userId)
        .then(usersData => {
          if (usersData) {
            setUser(usersData);
            setIsLoadedUser(true);
          }
        });
    }
  },
  []);

  const handelCloseModal = () => {
    dispach(TODO_ACTIONS.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoadedUser ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #
              {selectTodo.id}
            </div>

            <button
              type="button"
              aria-label="Mute volume"
              className="delete"
              data-cy="modal-close"
              onClick={handelCloseModal}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectTodo.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${user && user.email}`}>
                {user && user.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
