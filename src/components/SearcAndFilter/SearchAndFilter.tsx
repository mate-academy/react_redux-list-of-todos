import { useDispatch } from 'react-redux';

export const SearchAndFilter = () => {
  const dispatch = useDispatch();

  const searchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_SEARCH_TITLE', payload: event.target.value });
  };

  const filterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_FILTER_PARAMETER', payload: event.target.value });
  };

  return (
    <div>
      <label htmlFor="searchInput">
        Filter todos by title:
        <input
          type="text"
          id="searchInput"
          placeholder="Input title"
          onChange={searchInput}
        />
      </label>

      <select
        id="selectTodos"
        placeholder="Input title"
        onChange={filterSelect}
      >
        <option value="All">Show all</option>
        <option value="Active">Show active</option>
        <option value="Completed">Show completed</option>
      </select>
    </div>
  );
};
