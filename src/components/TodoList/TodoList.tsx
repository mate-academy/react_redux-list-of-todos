import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Todo } from '../../types/Todo';
import { Option } from '../../types/enums';
import { actions as todoActions } from '../../store/todos';
import { TodoInfo } from '../TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState<Option>(Option.ALL);

  const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectedOption = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedOption(event.target.value as Option);
  };

  const filteredTodos = todos.filter(
    todo => todo.title.toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
      && (selectedOption === 'all'
        || (selectedOption === 'active' && !todo.completed)
        || (selectedOption === 'completed' && todo.completed)
      ),
  );

  return (
    <div className="TodoList">
      <h2>Todos</h2>

      <div className="TodoList__list-container">
        <input
          className="form-control"
          type="text"
          value={searchQuery}
          placeholder="Type search word"
          onChange={handleSearchQuery}
        />

        <div>
          <select
            className="form-select"
            aria-label="Default select example"
            value={selectedOption}
            onChange={handleSelectedOption}
          >
            <option value={Option.ALL}>All</option>
            <option value={Option.ACTIVE}>Active</option>
            <option value={Option.COMPLETED}>Completed</option>
          </select>
        </div>

        <button
          className="btn btn-light"
          type="button"
          onClick={() => {
            dispatch(todoActions.randomize());
          }}
        >
          Randomize
        </button>

        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <TodoInfo key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
});
