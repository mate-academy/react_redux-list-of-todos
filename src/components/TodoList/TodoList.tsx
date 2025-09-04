/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { clearSelectedTodo, setSelectedTodo } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};
export const TodoList: React.FC<Props> = ({ todos }) => {
  const { selectedTodo } = useAppSelector(state => state.selectedTodo);
  const dispatch = useDispatch();

  // const handleClick = (todo: Todo) => {
  //   console.log('z')
  //   return selectedTodo === todo
  //     ? dispatch(clearSelectedTodo())
  //     : dispatch(setSelectedTodo(todo));
  // };

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => {
          const { id, title, completed } = todo;
          const handleClick = () => {
            return selectedTodo === todo
              ? dispatch(clearSelectedTodo())
              : dispatch(setSelectedTodo(todo));
          };

          return (
            <tr data-cy="todo" key={id}>
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>
              <td className="is-vcentered is-expanded">
                <p
                  className={completed ? 'has-text-success' : 'has-text-danger'}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={handleClick}
                >
                  <span className="icon">
                    <i
                      className={
                        selectedTodo === todo
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
