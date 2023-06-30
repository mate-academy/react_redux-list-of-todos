import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FilterBy } from '../../types/FilterBy';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispach = useAppDispatch();
  const filter = useAppSelector(state => state.filter);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    dispach(filterActions.setFilter(event.target.value as Status));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            <option value={FilterBy.all}>All</option>
            <option value={FilterBy.active}>Active</option>
            <option value={FilterBy.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={(event) => {
            dispach(filterActions.setQuery(event.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => dispach(filterActions.setQuery(''))}
          />
        </span>
      </p>
    </form>
  );
};
