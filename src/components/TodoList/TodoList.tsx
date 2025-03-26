/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../hooks';
import { IconCompleted } from '../IconCompleted/IconCompleted';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { Filter } from '../../types/Filter';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const filterTodos = (
  todos: Todo[],
  { query, status }: Filter,
): Todo[] => {
  let copyTodos = [...todos];

  if (query) {
    copyTodos = copyTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (status) {
    case 'active':
      return copyTodos.filter(todo => !todo.completed);
    case 'completed':
      return copyTodos.filter(todo => todo.completed);
    default:
      return copyTodos;
  }
};

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  console.log(filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  console.log(currentTodo);

  const filteredTodos = filterTodos(todos, filter);

  const setCurrentTodo = (todo: Todo) => {
    if (currentTodo?.id !== todo.id) {
      dispatch(currentTodoSlice.actions.setTodo(todo));
    } else {
      dispatch(currentTodoSlice.actions.setTodo(null));
    }
  };

  return (
    <>
    {filteredTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filteredTodos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? <IconCompleted /> : ''}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={
                      todo.completed ? 'has-text-success' : 'has-text-danger'
                    }
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={`far ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
