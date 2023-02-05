import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([...todos]);

  function sortTodos() {
    let correctListOfTodos;

    switch (status) {
      case 'active':
        correctListOfTodos = [...todos].filter(todo => !todo.completed);
        break;

      case 'completed':
        correctListOfTodos = [...todos].filter(todo => todo.completed);
        break;

      default:
        correctListOfTodos = [...todos];
        break;
    }

    setVisibleTodos(correctListOfTodos.filter(todo => (
      todo.title.toLowerCase()).includes(query.toLowerCase())));
  }

  useEffect(() => {
    sortTodos();
  }, [query, status]);

  function setTargetTodo(id: number) {
    const targetTodo = todos.find(todo => todo.id === id);

    if (targetTodo) {
      dispatch(actions.setTodo(targetTodo));
    }
  }

  return (
    <>
      {Boolean(!visibleTodos.length) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
            <tr
              key={todo.id}
              className={classNames({
                'has-background-info-light': currentTodo?.id === todo.id,
              })}
              data-cy="todo"
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
                <p className={classNames({
                  'has-text-danger': !todo.completed,
                  'has-text-success': todo.completed,
                })}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => setTargetTodo(todo.id)}

                >
                  <span className="icon">
                    <i className={classNames('far', {
                      'fa-eye-slash': currentTodo?.id === todo.id,
                      'far fa-eye': currentTodo?.id !== todo.id,
                    })}
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
