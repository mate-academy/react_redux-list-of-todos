import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import {useDispatch} from 'react-redux';
import { useAppSelector } from '../../hooks';
import {actions as currentTodoActions, currentTodo} from '../../features/currentTodo';
import { actions as todoActions, TodosState } from '../../features/todos';

export const TodoModal = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector<currentTodo>(state => state.currentTodo);
  const { loading } = useAppSelector<TodosState>(state => state.todos);

  const setLoader = (value: boolean) => dispatch(todoActions.setLoader(value));

  const setCurrentTodo = (value: Todo | null) => dispatch(currentTodoActions.setCurrentTodo(value));

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (currentTodo) {
      setLoader(true);
      getUser(currentTodo?.userId).then(item => {
        setCurrentUser(item);
        setLoader(false);
      });
    }
  }, []);

  return (
    <div
      className={classNames('modal', {
        'is-active': currentTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{currentTodo && currentTodo.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                setCurrentTodo(null);
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo && currentTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {currentTodo && currentTodo.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={currentUser ? 'mailto:' + currentUser.email : ''}>
                {currentUser && currentUser.name}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
