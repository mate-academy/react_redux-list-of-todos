import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([...todos]);

  const sortTodos = useCallback(() => {
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
  }, [query, status]);

  useEffect(() => {
    sortTodos();
  }, [sortTodos]);

  function setTargetTodo(id: number) {
    const targetTodo = todos.find(todo => todo.id === id);

    if (targetTodo) {
      dispatch(actions.setTodo(targetTodo));
    }
  }

  return (
    <>
      {!visibleTodos.length ? (
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
            {visibleTodos.map(todo => (
              <TodoItem
                todo={todo}
                key={todo.id}
                setTodos={(val) => setTargetTodo(val)}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
