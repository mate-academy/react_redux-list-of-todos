import { useDispatch, useSelector } from 'react-redux';
import { Status } from '../../types/Status';
import { actions } from '../../features/filter';
import { RootState } from '../../app/store';

export enum StatusFilter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const text = useSelector<RootState, string>(state => state.filter.text);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.filterSelect(event.target.value as Status));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.filterText(event.target.value as string));
  };

  const handleDelete = () => {
    dispatch(actions.filterText(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
            <option value={StatusFilter.ALL}>{StatusFilter.ALL}</option>
            <option value={StatusFilter.ACTIVE}>{StatusFilter.ACTIVE}</option>
            <option value={StatusFilter.COMPLETED}>
              {StatusFilter.COMPLETED}
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleInput}
          value={text}
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
            onClick={handleDelete}
          />
        </span>
      </p>
    </form>
  );
};
