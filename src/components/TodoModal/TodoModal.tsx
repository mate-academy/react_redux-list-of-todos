import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(currentTodo);

    if (currentTodo?.id) {
      // eslint-disable-next-line no-console
      console.log(currentTodo.id);

      getUser(currentTodo.id).then((result: User) => setUser(result))
        .catch(() => setUser({
          id: 15,
          name: 'User wasn\'t found',
          email: 'User wasn\'t found',
          phone: 'User wasn\'t found',
        }));
    }
  }, [currentTodo]);

  const dispatch = useDispatch();

  const removeCurrentTodo = () => dispatch(actions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user?.name
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
                onClick={() => removeCurrentTodo()}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* For not completed */}
                {currentTodo?.completed
                  ? <strong className="has-text-success">Done</strong>
                  : <strong className="has-text-danger">Planned</strong>}

                {' by '}

                <a href={`mailto:${user.email}`}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )
        : <Loader />}

    </div>
  );
};
