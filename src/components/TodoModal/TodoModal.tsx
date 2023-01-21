import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api';
import { useAppSelector } from '../../app/hooks';
import { removeTodo } from '../../features/currentTodo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(() => {
    if (selectedTodo) {
      setIsUserLoading(true);

      getUser(selectedTodo?.userId)
        .then(user => {
          setSelectedUser(user);
          setIsUserLoading(false);
        });
    }
  }, [selectedTodo]);

  const dispatch = useDispatch();

  const handleOnClose = () => {
    dispatch(removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        {isUserLoading
          ? (
            <Loader />
          ) : (
            <>
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  {`Todo #${selectedTodo?.id}`}
                </div>

                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={handleOnClose}
                />
              </header>

              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {selectedTodo?.title}
                </p>

                <p className="block" data-cy="modal-user">
                  {selectedTodo?.completed ? (
                    <strong className="has-text-success">Done</strong>
                  ) : (
                    <strong className="has-text-danger">Planned</strong>
                  )}
                  {' by '}
                  <a href="mailto:Sincere@april.biz">{selectedUser?.name}</a>
                </p>
              </div>
            </>
          )}
      </div>
    </div>
  );
};
