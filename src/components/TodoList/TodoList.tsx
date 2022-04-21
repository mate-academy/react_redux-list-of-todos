import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodosFromServer } from '../../api/api';
import { addTodosAction } from '../../store/actions';
import { todosSelector } from '../../store/selectors';
import { TodoItem } from '../TodoItem';
import './TodoList.scss';

enum SelectOptions {
  All,
  Completed,
  Active,
}

export const TodoList: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const [searchedValue, setSearchedValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(SelectOptions.All);

  const todos = useSelector(todosSelector);

  useEffect(() => {
    getTodosFromServer()
      .then(data => dispatch(addTodosAction(data)));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedValue(event.target.value);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(({ title, completed }) => {
      switch (selectedOption) {
        case SelectOptions.All:
          return title.toLowerCase().includes(searchedValue.toLowerCase());
        case SelectOptions.Active:
          return title.toLowerCase().includes(searchedValue.toLowerCase()) && (
            !completed
          );
        case SelectOptions.Completed:
          return title.toLowerCase().includes(searchedValue.toLowerCase()) && (
            completed
          );
        default:
          return false;
      }
    });
  }, [todos, searchedValue, selectedOption]);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__control">
        <input
          type="text"
          value={searchedValue}
          onChange={handleChange}
          placeholder="Search Todo"
        />

        <select
          value={selectedOption}
          onChange={(event) => {
            setSelectedOption(Number(event.target.value));
          }}
        >
          <option value={SelectOptions.All}>
            All
          </option>
          <option value={SelectOptions.Active}>
            Active
          </option>
          <option value={SelectOptions.Completed}>
            Completed
          </option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              userId={todo.userId}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </ul>
      </div>
    </div>
  );
});
