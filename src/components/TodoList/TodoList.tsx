import React, { useMemo } from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filteredTodos = useMemo(() => {
    let newTodos = [...todos];

    if (query) {
      newTodos = newTodos.filter(
        todo => todo.title.toLowerCase().includes(query),
      );
    }

    switch (status) {
      case 'active':
        return newTodos.filter(todo => !todo.completed);

      case 'completed':
        return newTodos.filter(todo => todo.completed);

      default:
        return newTodos;
    }
  }, [status, query]);

  const handleSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {filteredTodos.length > 0
        ? (
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
              {filteredTodos.map(todo => {
                const isSelectedTodo = currentTodo?.id === todo.id;

                return (
                  <tr
                    key={todo.id}
                    data-cy="todo"
                    className={cn({
                      'has-background-info-light': isSelectedTodo,
                    })}
                  >
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      {todo.completed && (
                        <span className="icon" data-cy="iconCompleted">
                          <i className="fas fa-check" />
                        </span>
                      )}
                    </td>

                    <td className="is-vcentered is-expanded">
                      {todo.completed ? (
                        <p className="has-text-success">
                          {todo.title}
                        </p>
                      ) : (
                        <p className="has-text-danger">
                          {todo.title}
                        </p>
                      )}
                    </td>

                    <td className="has-text-right is-vcentered">
                      <button
                        data-cy="selectButton"
                        className="button"
                        type="button"
                        onClick={() => handleSelectedTodo(todo)}
                      >
                        <span className="icon">
                          <i className={cn('far', {
                            'fa-eye': !isSelectedTodo,
                            'fa-eye-slash': isSelectedTodo,
                          })}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
    </>
  );
};
