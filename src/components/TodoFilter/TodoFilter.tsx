import React from 'react';
import './TodoFilter.scss';
import classNames from 'classnames';
import { Filter } from '../../Filter';

type Props = {
  onSaveOption: (option: string) => void,
  onSaveQuery: (searchWord: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  onSaveOption,
  onSaveQuery,
}) => {
  const [word, setWord] = React.useState('');

  React.useEffect(() => onSaveQuery(word), [word]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => onSaveOption(event.target.value)}
          >
            <option value={Filter.all}>All</option>
            <option value={Filter.active}>Active</option>
            <option value={Filter.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={word}
          onChange={(event) => setWord(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className={classNames('delete',
              {
                'close-btn': word.length === 0,
              })}
            onClick={() => setWord('')}
          />
        </span>
      </p>
    </form>
  );
};
