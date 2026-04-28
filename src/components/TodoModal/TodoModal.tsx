import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({ setOpen }) => {
  const todo = useSelector((state: RootState) => state.todo);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);

        const data = await getUser(todo?.userId as number);

        setUser(data);
      } catch (e) {
        setError('Error');
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [todo]);

  if (error) {
    return <p>Try again</p>;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{todo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => setOpen(false)}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {todo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!todo?.completed && (
                <strong className="has-text-danger">Planned</strong>
              )}

              {/* For completed */}
              {todo?.completed && (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href="mailto:Sincere@april.biz">{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
