import React, { useCallback, useEffect, useState } from 'react';
import { Loader } from '../Loader';
import classNames from 'classnames';
import { User } from '../../types/User';
import { getUser } from '../../api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { closeSelectedTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [todoOwner, setTodoOwner] = useState<User | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector(
    (state: RootState) => state.currentTodo.todo,
  );

  const findUser = useCallback(() => {
    setModalLoading(true);
    if (selectedTodo?.userId) {
      getUser(selectedTodo.userId)
        .then(setTodoOwner)
        .catch(error => {
          alert(error);
          setTodoOwner(null);
        })
        .finally(() => {
          setModalLoading(false);
        });
    }
  }, [selectedTodo?.userId]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  return (
    <>
      <div
        className={classNames('modal', {
          'is-active': selectedTodo?.id !== 0,
        })}
        data-cy="modal"
      >
        <div className="modal-background" />

        {modalLoading ? (
          <Loader />
        ) : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #{selectedTodo?.id}
              </div>

              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => {
                  dispatch(closeSelectedTodo());
                }}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {selectedTodo?.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!selectedTodo?.completed ? (
                  <strong className="has-text-danger">Planned</strong>
                ) : (
                  <strong className="has-text-success">Done</strong>
                )}
                {' by '}
                {todoOwner && (
                  <a href={`mailto:${todoOwner.email}`}>{todoOwner.name}</a>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
