import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoModal = () => {
  const pick = useSelector((state: RootState) => state.currentTodo);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      setLoadingUser(true);
      let user;

      if (pick) {
        user = await getUser(pick.userId);

        setCurrentUser(user);
      }

      setLoadingUser(false);
    };

    fetchUser();
  }, [pick]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      <div className="modal-card">
        <header className="modal-card-head">
          <p
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{pick && pick.id}
          </p>
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            aria-label="close"
            onClick={() => dispatch(setCurrentTodo(null))}
          />
        </header>

        <div className="modal-card-body">
          {loadingUser ? (
            <Loader loadingTodos={loadingUser} />
          ) : (
            <>
              <p className="block" data-cy="modal-title">
                {pick && pick.title}
              </p>

              <p className="block" data-cy="modal-user">
                <strong
                  className={
                    pick && pick.completed
                      ? 'has-text-success'
                      : 'has-text-danger'
                  }
                >
                  {pick && pick.completed ? 'Done' : 'Planned'}
                </strong>
                {' by '}
                <a href={`mailto:${currentUser?.email}`}>{currentUser?.name}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
