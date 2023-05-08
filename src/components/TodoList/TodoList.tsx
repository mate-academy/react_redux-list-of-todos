import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

export const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter.filter);
  const query = useAppSelector(state => state.filter.query);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case Filter.COMPLETED:
        return todos.filter(todo => todo.completed);
      case Filter.ACTIVE:
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }, [filter, todos]);

  const visibleTodos = useMemo(() => {
    if (!query.length) {
      return filteredTodos;
    }

    const reg = new RegExp(`${query}.+$`, 'i');

    return filteredTodos.filter(todo => {
      return todo.title.search(reg) !== -1;
    });
  }, [filteredTodos, query]);

  const onAddTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  if (!visibleTodos.length) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
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
          {visibleTodos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onAddTodo(todo)}
                >
                  <span className="icon">
                    <i className={
                      cn('far far',
                        {
                          'fa-eye-slash': currTodo?.id === todo.id,
                          'fa-eye': currTodo?.id !== todo.id,
                        })
                    }
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
