import { TodoCompletedCategory } from '../../types/todoCompletedCategory';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterSlice } from '../../features/filter';

const nameForCategoriesOption = {
  [TodoCompletedCategory.all]: 'All',
  [TodoCompletedCategory.active]: 'Active',
  [TodoCompletedCategory.competed]: 'Competed',
};

export const TodoFilter = () => {
  const { query, category: todoCategory } = useAppSelector(
    state => state.filter,
  );
  const dispatch = useAppDispatch();

  const changeQuery = (newQuery: string) => {
    dispatch(filterSlice.actions.changeQuery(newQuery));
  };

  const changeTodoCategory = (newCategory: TodoCompletedCategory) => {
    dispatch(filterSlice.actions.changeStatus(newCategory));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoCategory}
            onChange={event =>
              changeTodoCategory(event.target.value as TodoCompletedCategory)
            }
          >
            {Object.values(TodoCompletedCategory).map(option => (
              <option key={option} value={option.toLowerCase()}>
                {nameForCategoriesOption[option]}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={query}
          placeholder="Search..."
          onChange={event => changeQuery(event.target.value.toLowerCase())}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
