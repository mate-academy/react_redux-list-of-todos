import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../api';
import { User } from '../../types/User';
import { Loader } from '../Loader';
import { useAppSelector } from '../../store';
import { actions as selectedTodoActions } from '../../store/selectedTodo';

export const TodoModal: FC = () => {
  const dispatch = useDispatch();
  const todo = useAppSelector(state => state.selectedTodo);
  const [userOfTodo, setUserOfTodo] = useState<User>();

  useEffect(() => {
    if (!todo) {
      return;
    }

    getUser(todo.userId).then((user) => {
      setUserOfTodo(user);
    });
  }, []);

  return (
    <>
      {todo && (
        <div className="modal is-active">
          <div className="modal-background" />

          {!userOfTodo
            ? <Loader />
            : (
              <div className="modal-card">
                <header className="modal-card-head">
                  <div className="modal-card-title has-text-weight-medium">
                    {`Todo #${todo.id}`}
                  </div>
                  <a
                    href="#close"
                    className="delete"
                    onClick={() => (
                      dispatch(selectedTodoActions.clearSelectedTodo())
                    )}
                  >
                    Close
                  </a>
                </header>

                <div className="modal-card-body">
                  <p className="block">
                    {todo.title}
                  </p>

                  <p className="block">
                    {todo.completed
                      ? <strong className="has-text-success">Done</strong>
                      : <strong className="has-text-danger">Planned</strong>}
                    {' by '}
                    <a href={`mailto:${userOfTodo.email}`}>
                      {userOfTodo.name}
                    </a>
                  </p>
                </div>
              </div>
            )}
        </div>
      )}
    </>
  );
};
