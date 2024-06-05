import { FC } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { User } from '../../types/User';

type TPros = {
  loadingModal: boolean;
  user: User;
};

export const TodoModal: FC<TPros> = ({ loadingModal, user }) => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const { email, name } = user;
  const emailUser = `mailto:${email}`;

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      {loadingModal && <Loader />}

      {!loadingModal && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${todo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch({ type: 'currentTodo/REMOVE' })}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={emailUser}>{name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
