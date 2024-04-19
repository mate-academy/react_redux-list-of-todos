import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  const removeTodo = () => dispatch(currentTodoActions.removeTodo());

  const [isLoading, setIsLoading] = useState(false);

  const [author, setAuthor] = useState<User | null>(null);

  const fetchUser = async (userId: number) => {
    try {
      setIsLoading(true);

      const user = await getUser(userId);

      setAuthor(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentTodo) {
      fetchUser(currentTodo?.userId);
    }
  }, [currentTodo]);

  return (
    <div className={cn('modal', { 'is-active': currentTodo })} data-cy="modal">
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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => removeTodo()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {currentTodo?.completed ? (
                <strong className="has-text-success">Done</strong>
              ) : (
                <strong className="has-text-danger">Planned</strong>
              )}
              {' by '}
              {author && <a href={`mailto:${author.email}`}>{author.name}</a>}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
