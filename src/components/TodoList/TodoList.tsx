/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearTodo, selectTodo } from '../../features/currentTodo';
import { Todo } from '../../types';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos)
  const currentTodo = useAppSelector((store) => store.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);
  
  const dispatch = useAppDispatch();

  const filteredTodo = todos.filter(todo => {
    const matchesStatus = 
    status === 'all' 
      ? true 
      : status === 'active'
        ? !todo.completed
        : todo.completed
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    return matchesStatus && matchesQuery;
  })

  const handleCurrentTodo = (todo: Todo) => {
    if (todo.id !== currentTodo?.id) {
      dispatch(selectTodo(todo))
    }
    else {
      dispatch(clearTodo())
    }
  }

console.log()
  return (
    <>
    {filteredTodo.length === 0 ? (
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
            {filteredTodo.map((todo) => {
              const { id, title, completed } = todo;
      
              return (
                <tr
                  data-cy="todo"
                  key={id}
                  className={id === currentTodo?.id ? "has-background-info-light" : ""}
                >
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    <span className={completed ? "fas fa-check" : ""}></span>
                  </td>
      
                  <td className="is-vcentered is-expanded">
                    <p className={completed ? 'has-text-success' : 'has-text-danger'}>{title}</p>
                  </td>
      
                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        handleCurrentTodo(todo)
                      }}
                    >
                      <span className="icon">
                        <i className={classNames('far', {
                              'fa-eye-slash': id === currentTodo?.id,
                              'fa-eye': id !== currentTodo?.id,
                            })} />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
      </table>
    )
  }
    </>
  );
};
