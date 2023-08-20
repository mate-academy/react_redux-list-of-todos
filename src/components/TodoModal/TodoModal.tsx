import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  currentTodo: Todo;
};

export const TodoModal: React.FC<Props> = ({ currentTodo }) => {
  const [userInfo, setUserInfo] = useState<User>();
  const [isLoader, setIsLoader] = useState(false);
  const {
    userId,
    id,
    title,
    completed,
  } = currentTodo;

  const loadDataUser = async (currentUserId: number) => {
    try {
      setIsLoader(true);
      const data = await getUser(currentUserId);

      setUserInfo(data);
    } catch (error) {
      window.console.log('error = ', error);
    } finally {
      setIsLoader(false);
    }
  };

  useEffect(() => {
    loadDataUser(userId);
  }, []);

  const dispatch = useDispatch();
  const closeTodo = () => dispatch(currentTodoActions.removeTodo());

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoader && <Loader />}

      {userInfo && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => closeTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{title}</p>

            <p className="block" data-cy="modal-user">
              {completed
                ? (<strong className="has-text-success">Done</strong>)
                : (<strong className="has-text-danger">Planned</strong>)}
              {' by '}
              <a href={`mailto:${userInfo.email}`}>{userInfo.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
