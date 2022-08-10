import classNames from 'classnames';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { actions as selectedTodoActions } from '../../store/selectedTodo';
import { SortedType } from '../../types/SortType';
import { Todo } from '../../types/Todo';

export const TodoList: FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => {
    const { query, completingState } = state.filter;

    return state.todos.filter(todo => {
      const queryState = todo.title.includes(query);

      switch (completingState) {
        case SortedType.active:
          return !todo.completed && queryState;
        case SortedType.completed:
          return todo.completed && queryState;
        default:
          return queryState;
      }
    });
  });

  const getRowClass = (todo: Todo) => (
    classNames(
      { 'has-background-danger-light has-text-danger': !todo.completed },
      { 'has-background-success-light has-text-success': todo.completed },
    )
  );

  return (
    <table
      data-cy="listOfTodos"
      className="table is-narrow is-fullwidth"
    >
      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            className={getRowClass(todo)}
          >
            <td className="is-vcentered">
              <span className="icon is-size-5">
                <i className={classNames(
                  'fas',
                  { 'fa-square-xmark': !todo.completed },
                  { 'fa-check-square': todo.completed },
                )}
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
                onClick={() => (
                  dispatch(selectedTodoActions.setSelectedTodo(todo))
                )}
              >
                {`Show #${todo.id}`}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
