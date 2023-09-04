import { FC } from 'react';
import { Status } from '../../types/Status';
import { SelectedName } from '../../types/SelectedName';

type Props = {
  handleChangeSearch: (value: string) => void,
  handleChangeStatus: (value: Status) => void,
  query: string,
  status: string,
};

export const TodoFilter: FC<Props> = ({
  query,
  status,
  handleChangeSearch,
  handleChangeStatus,
}) => {
  const selectedName = [
    SelectedName.All, SelectedName.Active, SelectedName.Completed,
  ];

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={({ target }) => handleChangeStatus(
              target.value as Status,
            )}
          >
            {selectedName.map(value => (
              <option key={value} value={value}>{value}</option>
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
          onChange={({ target }) => handleChangeSearch(target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleChangeSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
