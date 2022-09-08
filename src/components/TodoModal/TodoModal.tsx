import React from 'react';
import { useDispatch } from 'react-redux';
// import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

interface Props {
  reduxCurrentTodo: Todo;
}

export const TodoModal: React.FC<Props> = (props) => {
  const { reduxCurrentTodo: currentTodo } = props;

  const dispatch = useDispatch();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!currentTodo
        ? (
          <Loader />
        )
        : (
          <div className="modal-card">
            <header className="modal-card-head">
              <div
                className="modal-card-title has-text-weight-medium"
                data-cy="modal-header"
              >
                Todo #
                {currentTodo.id}
              </div>

              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                type="button"
                className="delete"
                data-cy="modal-close"
                onClick={() => dispatch({
                  type: 'currentTodo/REMOVE',
                })}
              />
            </header>

            <div className="modal-card-body">
              <p className="block" data-cy="modal-title">
                {currentTodo.title}
              </p>

              <p className="block" data-cy="modal-user">
                {!currentTodo.completed && (
                  <strong className="has-text-danger">Planned</strong>
                )}

                {currentTodo.completed && (
                  <strong className="has-text-success">Done</strong>
                )}
                {' by '}

                <a href="mailto:Sincere@april.biz">{' '}</a>
              </p>
            </div>
          </div>
        )}

    </div>
  );
};
