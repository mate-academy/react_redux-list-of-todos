import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { TodoModalCard } from '../TodoModalCard/TodoModalCard';

export const TodoModal = () => {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const todo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    if (todo !== null) {
      getUser(todo.userId).then((res) => {
        setUser(res);
      });
    }
  }, []);

  const closeModalTodo = () => {
    dispatch(actions.removeTodo());
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {user
        ? (
          <TodoModalCard
            todo={todo}
            user={user}
            closeModalTodo={closeModalTodo}
          />
        )
        : <Loader />}
    </div>
  );
};
