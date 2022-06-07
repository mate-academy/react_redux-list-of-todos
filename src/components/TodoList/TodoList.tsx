import React, { useState, ChangeEvent } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.scss';

interface Props {
  todos: Todo[],
  selectUser: ((id: number) => void),
  onChange: ((child: Todo) => void),
}

enum Option {
  all = 'all',
  inprogress = 'inprogress',
  completed = 'completed',
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectUser,
  onChange,
}) => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('all');

  const filtredTodos = () => {
    switch (selected) {
      case Option.inprogress:
        return todos.filter(todo => todo.completed === false);
      case Option.completed:
        return todos.filter(todo => todo.completed === true);
      default:
        return todos;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelected(event.target.value);
  };

  const visibleTodos = filtredTodos()
    .filter(todo => todo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="TodoList">
      <h2 className="TodoList__title">Todos:</h2>
      <div className="TodoList__filters">
        <input
          type="text"
          data-cy="filterByTitle"
          className="TodoList__search"
          value={search}
          placeholder="Try to find"
          onChange={handleInputChange}
        />

        <select
          value={selected}
          className="TodoList__select"
          onChange={handleSelectChange}
        >
          <option value={Option.all}>All</option>
          <option value={Option.inprogress}>In progress</option>
          <option value={Option.completed}>Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul
          className="TodoList__list"
          data-cy="listOfTodos"
        >
          {visibleTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectUser={selectUser}
              onChange={onChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
