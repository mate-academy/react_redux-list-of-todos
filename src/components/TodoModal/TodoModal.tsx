import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../../api/api';

import { User } from '../../react-app-env';
import { useAppSelector } from '../../store';
import { actions as todoAction } from '../../store/currentTodoReducer';

import { Loader } from '../Loader';

export const TodoModal: FC = () => {
  const [user, setUser] = useState<User>();
  const selectedTodo = useAppSelector(state => state.selectTodo.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(person => setUser(person));
    }
  });

  return (
    <div className="modal is-active">
      <div className="modal-background" />
      {
        !user
          ? (<Loader />)
          : (
            <div className="modal-card">
              <header className="modal-card-head">
                <div className="modal-card-title has-text-weight-medium">
                  {selectedTodo?.id}
                </div>
                <a
                  href="#close"
                  className="delete"
                  type="button"
                  onClick={() => dispatch(todoAction.resetTodo())}
                >
                  Close
                </a>
              </header>

              <div className="modal-card-body">
                <p className="block">{selectedTodo?.title}</p>

                <p className="block">
                  {
                    selectedTodo?.completed
                      ? (<strong className="has-text-success">Done</strong>)
                      : (<strong className="has-text-danger">Planned</strong>)
                  }

                  {' by '}
                  <a href={`mailto:${user?.email}`}>
                    {user?.name}
                  </a>
                </p>
              </div>
            </div>
          )
      }
    </div>
  );
};
