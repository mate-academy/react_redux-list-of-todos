import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Todo } from './Todo';
import { showTodosOnly, stateTodos, todoFilterQuery } from '../store';
import { ACTIVE, COMPLETED, ALL } from '../constants';

export const TodoList = () => {
  const todos = useSelector(stateTodos);
  const todosSelector = useSelector(showTodosOnly);
  const query = useSelector(todoFilterQuery).trim();

  const filteredTodos = useMemo(() => {
    let tempTodos = [...todos];
    const filterQuery = query.trim();

    switch (todosSelector) {
      case ALL:
        tempTodos = tempTodos.filter(
          todo => todo.title && todo.title.includes(filterQuery)
        );
        break;

      case ACTIVE:
        tempTodos = tempTodos.filter(todo => (
          !todo.completed && todo.title && todo.title.includes(filterQuery)
        ));
        break;

      case COMPLETED:
        tempTodos = tempTodos.filter(todo => (
          todo.completed && todo.title && todo.title.includes(filterQuery)
        ));
        break;

      default:
        return tempTodos;
    }

    return tempTodos;
  }, [todosSelector, todos, query]);

  return (
    <ul className="list-group">
      {filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
