import { FC } from 'react';
import { completionOptions } from '../../mocks';
import { CompletionQuery } from '../../types/CompletionQuery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { changeQuery, changeStatus } from '../../features/filter';

export const TodoFilter: FC = ({}) => {
  const query = useSelector<RootState, string>(state => state.filters.query);
  const status = useSelector<RootState, CompletionQuery>(
    state => state.filters.status,
  );

  const dispatch = useDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event =>
              dispatch(changeStatus(event.target.value as CompletionQuery))
            }
          >
            {completionOptions.map(complQuery => (
              <option key={complQuery.name} value={complQuery.value}>
                {complQuery.name}
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
          placeholder="Search..."
          value={query}
          onChange={event => dispatch(changeQuery(event.target.value))}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(changeQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
