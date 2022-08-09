import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getingTodos } from '../store';
import { TodosActionTypes } from '../types/Todo';

type Props = {
  filterBy: string;
  visibleNumberTodos: number[],
  openModalHandler: () => void,
  appliedQuery: string;
};

const TodoList: React.FC<Props> = ({
  filterBy,
  visibleNumberTodos,
  openModalHandler,
  appliedQuery,
}) => {
  const [start, finish] = visibleNumberTodos;
  const { todos } = useSelector(getingTodos);
  const dispatch = useDispatch();

  let visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case 'all':
        return todo.title.includes(appliedQuery);
      case 'completed':
        return todo.completed && todo.title.includes(appliedQuery);
      case 'active':
        return !todo.completed && todo.title.includes(appliedQuery);
      default:
        return true;
    }
  });

  visibleTodos = visibleTodos.slice(start - 1, finish + 1);

  return (
    <table
      data-cy="listOfTodos"
      className="table is-narrow is-fullwidth"
    >

      <tbody>
        {visibleTodos.map((todo) => {
          return (
            <tr
              key={todo.id}
              className={todo.completed
                ? 'has-background-success-light has-text-success'
                : 'has-background-danger-light has-text-danger'}
            >
              <td className="is-vcentered">
                <span className="icon is-size-5">
                  <i className={todo.completed
                    ? 'fas fa-check-square'
                    : 'fas fa-square-xmark'}
                  />
                </span>
              </td>
              <td className="is-vcentered is-expanded">
                {todo.title}
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  className="button is-warning"
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: TodosActionTypes.SET_TODO,
                      payload: todo,
                    });
                    openModalHandler();
                  }}
                >
                  Show &nbsp;#
                  {todo.id}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>

    </table>
  );
};

export default TodoList;
