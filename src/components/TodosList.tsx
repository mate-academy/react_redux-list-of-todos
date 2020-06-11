import React from 'react';
import { useSelector } from 'react-redux';
import * as selector from '../store';
import { TodoItem } from './TodoItem';

const TodoList = () => {
  const loadedTodos = useSelector(selector.getLoadedTodos);
  const sortBy = useSelector(selector.getSortBy);

  const getVisibleTodos = (sortType: string, todos: Todo[]) => {
    switch (sortType) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));

      case 'id':
        return [...todos].sort((a, b) => a.id - b.id);

      case 'user':
        return [...todos].sort((a, b) => {
          return a.user && b.user
            ? a.user?.name.localeCompare(b.user.name)
            : 0;
        });

      default:
        return [...todos];
    }
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
