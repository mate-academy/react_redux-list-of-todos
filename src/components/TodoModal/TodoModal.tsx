import { useEffect } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { getUser } from '../../api';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';
type ModalProps = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  currentUser: User | null;
};

export const TodoModal = ({
  isLoading,
  setIsLoading,
  setCurrentUser,
  currentUser,
}: ModalProps) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (currentTodo) {
      getUser(currentTodo.userId)
        .then(res => {
          setCurrentUser(res);
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.error('Error');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentTodo, setCurrentUser, setIsLoading]);
  const onCloseWindow = () => {
    setCurrentUser(null);
    dispatch(currentTodoSlice.actions.deleteTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
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
            onClick={() => onCloseWindow()}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {currentTodo?.title}
          </p>

          <p className="block" data-cy="modal-user">
            {!currentTodo?.completed ? (
              <strong className="has-text-danger">Planned</strong>
            ) : (
              <strong className="has-text-success">Done</strong>
            )}
            {' by '}
            <a
              href={`mailto:${currentUser?.email}`}
              className={classNames({ 'is-loading': isLoading })}
            >
              {isLoading && <Loader />}
              {currentUser?.name}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
