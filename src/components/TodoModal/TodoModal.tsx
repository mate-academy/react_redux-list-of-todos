import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { TODO_ACTIONS_CREATOR } from '../../store/currentTodoId';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

interface Props {
  selectedTodo: Todo,
}

export const TodoModal: FC<Props> = (props) => {
  const { selectedTodo } = props;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsError(false);

    getUser(selectedTodo.userId)
      .then(setSelectedUser)
      .catch(() => setIsError(true));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!selectedUser
        ? <Loader />
        : (
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
                  dispatch(TODO_ACTIONS_CREATOR.set(null));
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                {isError
                  ? <div>User not found</div>
                  : (
                    <a href={`mailto:${selectedUser.email}`}>
                      {selectedUser.name}
                    </a>
                  )}
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
