import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { setSelectedTodo } from '../../features/currentTodo';
import cx from 'classnames';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export const TodoModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!selectedTodo) {
      return;
    }

    setLoadingUser(true);
    setError('');

    getUser(selectedTodo.userId)
      .then(setUser)
      .catch(() => setError('Try again later'))
      .finally(() => setLoadingUser(false));
  }, [selectedTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{selectedTodo?.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(setSelectedTodo(null))}
          />
        </header>

        <div className="modal-card-body">
          {loadingUser ? (
            <Loader />
          ) : error ? (
            <p className="has-text-danger" data-cy="modal-error">
              {error}
            </p>
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>
              <p className="block" data-cy="modal-user">
                <strong
                  className={cx('status', {
                    'has-text-success': selectedTodo?.completed,
                    'has-text-danger': !selectedTodo?.completed,
                  })}
                >
                  {selectedTodo?.completed ? 'Done' : 'Planned'}
                </strong>

                {' by '}

                {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="modal is-active" data-cy="modal">
  //     <div className="modal-background" />

  //     <Loader />

  //     <div className="modal-card">
  //       <header className="modal-card-head">
  //         <div
  //           className="modal-card-title has-text-weight-medium"
  //           data-cy="modal-header"
  //         >
  //           Todo #3
  //         </div>

  //         {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
  //         <button type="button" className="delete" data-cy="modal-close" />
  //       </header>

  //       <div className="modal-card-body">
  //         <p className="block" data-cy="modal-title">
  //           fugiat veniam minus
  //         </p>

  //         <p className="block" data-cy="modal-user">
  //           {/* For not completed */}
  //           <strong className="has-text-danger">Planned</strong>

  //           {/* For completed */}
  //           <strong className="has-text-success">Done</strong>
  //           {' by '}
  //           <a href="mailto:Sincere@april.biz">Leanne Graham</a>
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );
};
