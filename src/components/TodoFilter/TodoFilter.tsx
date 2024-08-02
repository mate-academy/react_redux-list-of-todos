import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import { SelectedStatus } from '../../types/SelectedStatus';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter = () => {
  const [inputQuery, setInputQuery] = useState('');
  const dispatch = useAppDispatch();

  /* eslint-disable react-hooks/exhaustive-deps */
  const applyQuery = useCallback(
    debounce(q => dispatch(filterActions.setQuery(q)), 300),
    [],
  );

  const onSelectedBy = (status: SelectedStatus) =>
    dispatch(filterActions.setStatus(status));

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleQueryReset = () => {
    setInputQuery('');
    applyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => onSelectedBy(e.target.value as SelectedStatus)}
          >
            <option value={SelectedStatus.all}>All</option>
            <option value={SelectedStatus.active}>Active</option>
            <option value={SelectedStatus.complited}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
