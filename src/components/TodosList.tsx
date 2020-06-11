import React from 'react';
import { useSelector } from 'react-redux';
import * as selector from '../store';
import { TodoItem } from './TodoItem';

const TodoList = () => {
  const loadedTodos = useSelector(selector.getLoadedTodos);
  const sortBy = useSelector(selector.getSortBy);
  const reverse = useSelector(selector.getSortOrder);

  const getVisibleTodos = (sortType: string, todos: Todo[]) => {
    let sortedTodos = [];

    switch (sortType) {
      case 'title':
        sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
        break;

      case 'id':
        sortedTodos = [...todos].sort((a, b) => a.id - b.id);
        break;

      case 'user':
        sortedTodos = [...todos].sort((a, b) => {
          return a.user && b.user
            ? a.user?.name.localeCompare(b.user.name)
            : 0;
        });
        break;

      default:
        return [...todos];
    }

    if (reverse) {
      sortedTodos.reverse();
    }

    return sortedTodos;
  };

  const visibleTodos = getVisibleTodos(sortBy, loadedTodos);


  return (
    <ul className="cards__list">
      {visibleTodos.map(todo => (
        <li key={todo.id}>
          <TodoItem todo={todo} />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
