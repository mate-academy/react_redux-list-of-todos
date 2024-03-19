import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  // const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const todo = useAppSelector(state => state.currentTodo);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoading(true);
    if (todo) {
      getUser(todo.userId).then(setUser);
    }

    setIsLoading(false);
  }, [todo]);

  // console.log(user);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && !user && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo #3
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" className="delete" data-cy="modal-close" />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            fugiat veniam minus
          </p>

          <p className="block" data-cy="modal-user">
            {/* For not completed */}
            <strong className="has-text-danger">Planned</strong>

            {/* For completed */}
            <strong className="has-text-success">Done</strong>
            {' by '}
            <a href="mailto:Sincere@april.biz">Leanne Graham</a>
          </p>
        </div>
      </div>
    </div>
  );
};
