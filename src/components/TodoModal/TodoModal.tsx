import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const activeTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();
  const removeActiveTodo = () => dispatch(actions.removeTodo());
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>({
    email: '',
    id: 0,
    name: '',
    phone: '',
  });

  useEffect(() => {
    if (!activeTodo) {
      return;
    }

    getUser(activeTodo.userId)
      .then(user => {
        setSelectedUser(user);
        setIsLoaded(true);
      });
  }, [activeTodo]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!isLoaded ? (
        <Loader />)
        : (
          activeTodo && (
            <div className="modal-card">
              <header className="modal-card-head">
                <div
                  className="modal-card-title has-text-weight-medium"
                  data-cy="modal-header"
                >
                  Todo #
                  {activeTodo.id}
                </div>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  type="button"
                  className="delete"
                  data-cy="modal-close"
                  onClick={removeActiveTodo}
                />
              </header>
              <div className="modal-card-body">
                <p className="block" data-cy="modal-title">
                  {activeTodo.title}
                </p>
                <p className="block" data-cy="modal-user">
                  {activeTodo.completed
                    ? <strong className="has-text-success">Done</strong>
                    : <strong className="has-text-danger">Planned</strong>}
                  {' by '}
                  <a href={`mailto: ${selectedUser.email}`}>
                    {selectedUser.name}
                  </a>
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};
