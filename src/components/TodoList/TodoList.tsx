/* eslint-disable */
import React, { useEffect } from 'react';
import { getTodos } from '../../api';
import { Todo } from '../../types/Todo';
import { setTodos } from '../../features/todos';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.items);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodos);

  const list = todos.filter(todo => {
    switch (status) {
      case 'all':
      return true;
      case 'active':
      return todo.completed === false;
      case 'completed':
      return todo.completed === true;
      }
    })


  useEffect(() => {
    getTodos().then((todos: Todo[]) => dispatch(setTodos(todos)));
  }, []);

  return (
    <>
      { list.length === 0 &&
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      }

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
          {list.filter(todo => todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())).map((todo: Todo, index) => (
          <tr key={index} data-cy="todo">
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={todo.completed ? "has-text-success" : "has-text-danger"}>{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button" onClick={() => dispatch(setTodo(todo))}>
                <span className="icon">
                  <i className={todo.id === currentTodo.item?.id ? "far fa-eye-slash" : "far fa-eye"} />
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
