import React, { Dispatch, SetStateAction } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { clearTodo, clearUser } from '../../features/currentTodo';
import classNames from 'classnames';
import { User } from '../../types/User';

type Props = {
  isModalOpen: boolean;
  setOpenerModalCard: Dispatch<SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({
  isModalOpen,
  setOpenerModalCard,
}) => {
  const dispatch = useDispatch();
  const currentTodo = useSelector<RootState, Todo | null>(
    state => state.currentTodoSlice.currentTodo,
  );

  const currentUser = useSelector<RootState, User | null>(
    state => state.currentTodoSlice.currentUser,
  );

  const handlerCloseModal = () => {
    dispatch(clearTodo());
    dispatch(clearUser());
    setOpenerModalCard(false);
  };

  return (
    <div
      className={classNames('modal', {
        'is-active': currentUser,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isModalOpen && <Loader />}

      {currentUser && currentTodo && !isModalOpen && (
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
              onClick={() => handlerCloseModal()}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {currentTodo?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {!currentTodo?.completed ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}

              {' by '}
              <a href={currentUser.email}>{currentUser.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
