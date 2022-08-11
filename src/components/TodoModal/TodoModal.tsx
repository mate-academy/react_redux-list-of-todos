import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { Todo } from '../../type/Todo';
import { actions as currentTodoActions } from '../../store/currentTodo';
import { useAppSelector } from '../../store';
import { User } from '../../type/User';
import { getUser } from '../../api';

type Props = {
};

export const TodoModal: React.FC<Props> = () => {
  const [user, setUser] = useState<User | null>(null);
  const currentTodo: Todo | null = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentTodo?.userId) {
      getUser(currentTodo.userId).then(setUser);
    }
  }, []);

  return (

    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!user
        ? <Loader />
        : (
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
                onClick={() => dispatch(currentTodoActions.removeCurrentTodo())}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {/* <strong className="has-text-success">Done</strong> */}
                {currentTodo?.completed
                  ? (
                    <strong className="has-text-success">
                      Done
                    </strong>
                  ) : (
                    <strong className="has-text-danger">
                      Planned
                    </strong>
                  )}

                {' by '}

                <a href={user?.email}>
                  {user?.name}
                </a>
              </p>
            </div>
          </div>
        )}
    </div>
  );
};
