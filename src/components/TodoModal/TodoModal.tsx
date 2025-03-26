import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { clearSelect } from '../../features/todos/todosSlice';

export const TodoModal = () => {
  const dispatch = useAppDispatch();

  const selected = useAppSelector(state => state.todos.selected) as Todo;

  const [isFetching, setIsFetching] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser(selected.userId).then(fetchedUser => {
      setIsFetching(false);
      setUser(fetchedUser);
    });
  }, [selected]);

  const handleClose = () => {
    dispatch(clearSelect());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isFetching ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selected.id}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="delete"
              data-cy="modal-close"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selected.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong
                className={classNames('', {
                  'has-text-danger': !selected.completed,
                  'has-text-success': selected.completed,
                })}
              >
                {selected.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
