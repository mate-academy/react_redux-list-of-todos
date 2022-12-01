import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
// import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  // selectedTodo: Todo;
  // setSelectedTodo: (empty: null) => void;
};

// export const TodoModal: React.FC<Props> = ({
//   // selectedTodo,
//   // setSelectedTodo,
// }) => {

export const TodoModal: React.FC<Props> = () => {
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);

  // const {
  //   id,
  //   userId,
  //   title,
  //   completed,
  // } = selectedTodo;

  useEffect(() => {
    (async () => {
      // хак для норм работы selectedUser
      // без него влетает в типы либо число либо андефайнд
      if (selectedTodo?.userId === undefined) {
        return;
      }
      // const selectedUser = await getUser(userId);

      const selectedUser = await getUser(selectedTodo?.userId);

      // if (selectedUser !== undefined) {
      //   return selectedUser;
      // }

      // if (selectedTodo?.userId !== undefined) {
      //   return selectedUser;
      // }

      setUser(selectedUser);
    })();
  }, []);

  const closeModal = () => {
    // setSelectedTodo(null);
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={closeModal}
              aria-label="close user`s todo window"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
