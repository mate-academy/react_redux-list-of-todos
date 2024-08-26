import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';
import { Status } from '../../types/Status';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const todosForFilter = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.selectTodo(todo));
  };

  function getFilteredTodos(allTodos: Todo[]) {
    let filteredTodos = [...allTodos];
    const adaptedQuery = filter.query.trim().toLowerCase();

    switch (filter.status) {
      case Status.Active:
        filteredTodos = allTodos.filter(todo => !todo.completed);
        break;

      case Status.Completed:
        filteredTodos = allTodos.filter(todo => todo.completed);
        break;

      default:
        break;
    }

    if (adaptedQuery) {
      return filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(adaptedQuery),
      );
    }

    return filteredTodos;
  }

  const todos = getFilteredTodos(todosForFilter);

  return (
    <>
      {!todos.length ? (
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
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onSelectTodo={handleSelectedTodo}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
