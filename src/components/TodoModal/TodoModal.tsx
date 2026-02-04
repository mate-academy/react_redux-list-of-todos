import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearSelectedTodoId } from '../../features/selectedTodoSlice';
import { getUser } from '../../api';
import { User } from '../../types/User';


export const TodoModal: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
    const selectedTodo = useAppSelector(state => state.selectedTodoId)
    const todos = useAppSelector(state => state.todos)
    const dispatch = useAppDispatch();
    const todo = todos.find(t => t.id === selectedTodo);
    useEffect(() => {
      setUser(null)
      setLoading(true)
      if (todo) {
        getUser(todo?.userId).then((userFromServer) => { setUser(userFromServer) }).finally(() => setLoading(false))
      }
    }, [todo])
    if (!todo) {
      return null;
    }
  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" onClick={() => dispatch(clearSelectedTodoId())}/>
      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #{todo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="delete" data-cy="modal-close" onClick={() => dispatch(clearSelectedTodoId())}/>
        </header>

        <div className="modal-card-body">
          {loading && <Loader />}
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {todo.completed ?
                      <strong className="has-text-success">Done</strong>
                  :
              < strong className="has-text-danger">Planned</strong>
          }
            {' by '}
            <a href={`mailto:${user?.email}`}>{user?.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
