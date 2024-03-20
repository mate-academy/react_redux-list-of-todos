/* eslint-disable */
import React, {useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as userActions } from '../../features/currentTodo';
import cn from 'classnames';

export const TodoList: React.FC = () => {
  const selectTodo = useAppSelector(state => state.currentTodo);
  const todos: Todo[] = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const handleClickSetTodo = (id: number, title: string, completed: boolean, userId: number) => {
    const elem: Todo = {
      id: id,
      title: title,
      completed: completed,
      userId: userId,

    }
    dispatch(userActions.setTodo(elem))
  };
  
  const filteredTodo = useMemo(() => {
    let filteredTodos = todos;
  
    if (status === 'active') {
      filteredTodos = filteredTodos.filter(item => !item.completed);
    } else if (status === 'completed') {
      filteredTodos = filteredTodos.filter(item => item.completed);
    }
  
    if (query) {
      filteredTodos = filteredTodos.filter(item => item.title.includes(query));
    }
  
    return filteredTodos;
  }, [todos, status, query]);

  return (
    <>
      {!filteredTodo.length && todos.length > 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
  
      <table className="table is-narrow is-fullwidth">
        {filteredTodo.length > 0 && (
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
        )}
        <tbody>
          {filteredTodo.map(todo => (
            <tr data-cy="todo" key={todo.id} className={cn(
              {"has-background-info-light": todo.id === selectTodo?.id},
            )}
            >
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {todo.completed && 
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>}
              </td>

              <td className="is-vcentered is-expanded">
                <p 
                  className={cn(
                    {"has-text-danger": !todo.completed},
                    {"has-text-success": todo.completed}
                  )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleClickSetTodo(todo.id, todo.title, todo.completed, todo.userId)}>
                  <span className="icon">
                    <i className={cn(
                      {"far fa-eye": !selectTodo},
                      {"far fa-eye-slash": todo.id === selectTodo?.id},
                    )}
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
