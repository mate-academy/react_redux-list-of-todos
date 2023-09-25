import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

const SELECT_VALUES = ['all', 'active', 'completed'];

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const TodoFilter = () => {
  const dispatch = useAppDispatch();

  const filterParams = useAppSelector(state => state.filter);

  const setQuery = (value: string) => {
    dispatch(filterActions.setQuery(value));
  };

  const setStatus = (value: string) => {
    dispatch(filterActions.setStatus(value));
  };

  const removeQuery = () => {
    dispatch(filterActions.removeQuery());
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
            value={filterParams.status}
            onChange={event => setStatus(event.target.value)}
          >
            {SELECT_VALUES.map(value => (
              <option
                value={value}
                key={value}
              >
                {capitalizeFirstLetter(value)}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="
        control
        is-expanded
        has-icons-left
        has-icons-right"
      >
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filterParams.query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterParams.query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={removeQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
