import { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { Loader } from '../Loader';

type Props = {
  todo?: Todo,
  selectedUser: number | null,
  selectUser: (id: number, todoId: number) => void;
};

export const TodoModal: React.FC<Props> = ({
  todo,
  selectedUser,
  selectUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const userFromServer = await getUser(selectedUser);

      setUser(userFromServer);
    };

    loadUser();
  }, []);

  return (
    <div className="modal is-active">
      <div className="modal-background" />

      {!user
        ? <Loader />
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div className="modal-card-title has-text-weight-medium">
                {`Todo #${todo?.id}`}
              </div>

              <a
                href="#close"
                className="delete"
                onClick={() => selectUser(0, 0)}
              >
                Close
              </a>
            </header>

            <div className="modal-card-body">
              <p className="block">{todo?.title}</p>

              <p className="block">
                {
                  todo?.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>
                }
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
