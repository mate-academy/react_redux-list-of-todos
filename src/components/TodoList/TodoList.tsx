import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { TodoModal } from '../TodoModal';
import { useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  const selectedTodo
  = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  const [modalLoading, setModalLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleOpenModal = (newTodo: Todo) => () => {
    setModalLoading(true);
    dispatch(currentTodoActions.setTodo(newTodo));
    setTimeout(() => {
      getUser(newTodo.userId).then(setSelectedUser)
        .finally(() => {
          setModalLoading(false);
        });
    }, 300);
  };

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th aria-label="Icon">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>
            <th>Title</th>
            <th aria-label="Empty" />
          </tr>
        </thead>

        <tbody>
          {todos.map(({
            id,
            completed,
            title,
            userId,
          }) => (
            <tr
              key={id}
              data-cy="todo"
              className={classNames({
                'has-background-info-light': selectedTodo?.id === id,
              })}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p className={classNames({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
                >
                  {title}
                </p>
              </td>

              <td
                aria-label="ModalBtnWrapper"
                className="has-text-right is-vcentered"
              >
                <button
                  onClick={handleOpenModal({
                    id,
                    completed,
                    title,
                    userId,
                  })}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  aria-label="ModalBtn"
                >
                  <span className="icon">
                    <i className={classNames(
                      'far', {
                        'fa-eye': selectedTodo?.id !== id,
                        'fa-eye-slash': selectedTodo?.id === id,
                      },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          modalLoading={modalLoading}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </>
  );
};
