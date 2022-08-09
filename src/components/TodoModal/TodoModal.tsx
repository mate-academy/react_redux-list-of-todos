import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../Loader';
import { getingTodos, getingUser } from '../../store';
import { fetchUser } from '../../store/action-creators/user';
import { UserActionTypes } from '../../types/User';

type Props = {
  closeModalHandler: () => void;
};

export const TodoModal: FC<Props> = ({ closeModalHandler }) => {
  const { loading, user } = useSelector(getingUser);
  const { todo } = useSelector(getingTodos);

  const dispatch = useDispatch();

  useEffect(() => {
    if (todo) {
      dispatch(fetchUser(todo.userId));
    }

    return () => {
      dispatch({ type: UserActionTypes.SET_USER_NULL, payload: null });
    };
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      {loading && <Loader /> }

      {!loading && user && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium">
              Todo&nbsp;#
              {todo?.id}
            </div>
            <a
              href="#close"
              className="delete"
              onClick={closeModalHandler}
            >
              Close
            </a>
          </header>

          <div className="modal-card-body">
            <p className="block">{todo?.title}</p>

            <p className="block">
              {todo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>
                {user?.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
