import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../features/currentTodo';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: FC = () => {
  const [user, setUser] = useState<User>();
  const dispatch = useDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const handleClick = () => {
    dispatch(actions.removeTodo());
  };

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(dataFromServer => setUser(dataFromServer));
    }
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user || !selectedTodo
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
                onClick={() => handleClick()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {selectedTodo.completed
                  ? (<strong className="has-text-success">Done</strong>)
                  : (<strong className="has-text-danger">Planned</strong>)}
                {' by '}
                <a href={`mailto:${user.email}`}>{user.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
