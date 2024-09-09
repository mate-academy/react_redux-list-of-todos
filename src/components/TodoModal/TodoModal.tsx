import React, { Dispatch, SetStateAction } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentTodo } from '../../types/Todo';
import { RootState } from '../../app/store';
import { clearTodo } from '../../features/currentTodo';
import classNames from 'classnames';

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const TodoModal: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const currentTodo = useSelector<RootState, CurrentTodo | null>(
    state => state.currentTodoSlice.currentTodo,
  );

  const handlerCloseModal = () => {
    setIsModalOpen(false);

    dispatch(clearTodo());
  };

  return (
    <div
      className={classNames('modal', {
        'is-active': currentTodo,
      })}
      data-cy="modal"
    >
      <div className="modal-background" />

      {isModalOpen && <Loader />}

      {currentTodo?.user && !isModalOpen && (
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
              <a href={currentTodo?.user?.email}>{currentTodo?.user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
