// eslint-disable-next-line import/no-cycle
import { FilterValues } from '../../App';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

type Props = {
  selectValue: string,
  inputValue: string,
};

export const TodoFilter: React.FC<Props> = ({
  selectValue,
  inputValue,
}) => {
  const dispatch = useAppDispatch();
  const changeQuery = (value: string) => dispatch(
    filterActions.changeQuery(value),
  );
  const changeStatus = (value: string) => dispatch(
    filterActions.changeStatus(value),
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={(e) => changeStatus(e.target.value)}
          >
            <option value={FilterValues.All.toLowerCase()}>
              {FilterValues.All}
            </option>
            <option value={FilterValues.Active.toLowerCase()}>
              {FilterValues.Active}
            </option>
            <option value={FilterValues.Completed.toLowerCase()}>
              {FilterValues.Completed}
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
          value={inputValue}
          onChange={(e) => changeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
