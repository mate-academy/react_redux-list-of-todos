import { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { actions } from '../../features/currentTodo';
import { User } from '../../types/User';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';

export const TodoModal: FC = () => {
  const todo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currUser = async () => {
      if (todo) {
        const data = await getUser(todo.userId);

        setUser(data);
        setIsLoading(false);
      }
    };

    currUser();
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                {`Todo #${todo?.id}`}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch(actions.removeTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">{todo?.title}</p>

              <p className="block" data-cy="modal-user">
                {
                  todo?.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>
                }
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
