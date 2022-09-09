import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '../../app/store';
import { setSelectedTodo } from '../../features/selectTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const selectedTodo = useSelector((state: RootState) => (
    todos.find(todo => todo.id === state.selectTodo.todo)
  ));

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(response => {
        setSelectedUser(response);
        setIsLoading(false);
      });
    }
  });

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo №${selectedTodo?.id}`}
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
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed
                ? <strong className="has-text-success">Done</strong>
                : <strong className="has-text-danger">Planned</strong>}

              {' by '}

              <a href={`mailto:${selectedUser !== null ? selectedUser.email : ''}`}>
                {selectedUser !== null ? selectedUser.name : ''}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
