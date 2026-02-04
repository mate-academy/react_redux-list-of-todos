/* eslint-disable */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearSelectedTodoId, setSelectedTodoId } from '../../features/selectedTodoSlice';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos)
  const status = useAppSelector(state => state.filter.status)
  const query = useAppSelector(state => state.filter.query)
  const selectedTodo = useAppSelector(state => state.selectedTodoId)
  const visibleTodos = React.useMemo(() => {
    return todos.filter(todo => {
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && !todo.completed) ||
        (status === 'completed' && todo.completed);

      const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

      return matchesStatus && matchesQuery;
    });
  }, [todos, status, query]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearSelectedTodoId())
  }, [status, query, dispatch])
  return (
    <>

      {visibleTodos.length === 0 && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}

      {visibleTodos.length > 0 &&

      <>
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {visibleTodos.map(todo => {
              return (
                <tr data-cy="todo" key={todo.id}>
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered"> {todo.completed && <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>}</td>

                  <td className="is-vcentered is-expanded">
                    <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button data-cy="selectButton" className="button" type="button" onClick={() => dispatch(setSelectedTodoId(todo.id))}>
                      <span className="icon">
                        <i className={todo.id === selectedTodo ? "far fa-eye-slash" : "far fa-eye"} />
                      </span>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table></>}
    </>
  );
};
