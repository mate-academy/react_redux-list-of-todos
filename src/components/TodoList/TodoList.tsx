import React from 'react';
import className from 'classnames';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  filteredTodos: Todo[]
  loading: boolean
};

export const TodoList: React.FC<Props> = (props) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const {
    filteredTodos,
    loading,
  } = props;

  return (

    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>Title</th>
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
        {filteredTodos.map((todo) => {
          return (
            loading
              ? <Loader />
              : (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={className(currentTodo
                    && currentTodo.id === todo.id
                    && 'has-background-info-light')}
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
                    <p className={className(todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger')}
                    >
                      { todo.title }
                    </p>
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => setTodo(todo)}
                    >
                      <span className="icon">
                        <i className={className(currentTodo?.id === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye')}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              )
          );
        })}
      </tbody>
    </table>
  );
};
