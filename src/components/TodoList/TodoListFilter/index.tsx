import { FC } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { shuffleTodos } from '../../../store/reducers/TodosSlice';

type TodoListFilterProps = {
  query: string;
  onQueryChange: (value: string) => void;
  filterOption: string;
  onFilterChange: (value: string) => void;
};

const TodoListFilter: FC<TodoListFilterProps> = ({
  query,
  onQueryChange,
  filterOption,
  onFilterChange,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="TodoList__filter">
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <select
        value={filterOption}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="button"
        onClick={() => dispatch(shuffleTodos())}
      >
        Shuffle todos
      </button>
    </div>
  );
};

export default TodoListFilter;
