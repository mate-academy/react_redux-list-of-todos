import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  isRandom,
  getQuery,
  actions,
} from '../../store';
import './Search.scss';

export const SearchPanel: React.FC = () => {
  const dispatch = useDispatch();
  const random = useSelector(isRandom);
  const applyedQuery = useSelector(getQuery);
  const [query, setQuery] = useState(applyedQuery);

  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        dispatch(actions.setQuery(newQuery.toLowerCase()));
      } else {
        dispatch(actions.setQuery(''));
      }
    }, 500),
    [],
  );

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.filter(event.target.value));
  };

  const handleRandomizeClick = () => {
    dispatch(actions.randomize());
  };

  return (
    <>
      <div className="Search-panel__form">
        <input
          type="text"
          name="query"
          className="Search-panel__form__search"
          value={query}
          placeholder="Type search todo"
          onChange={handleQueryChange}
        />

        <select
          className="Search-panel__form__select"
          onChange={handleSelectChange}
        >
          <option
            value=""
            className="Search-panel__form__select__option"
          >
            Choose filter
          </option>
          <option value="all">All ToDos</option>
          <option value="completed">Completed Todos</option>
          <option value="active">Active ToDos</option>
        </select>

        <button
          type="button"
          title="Random todos sort"
          className={classNames(
            'Search-panel__form__button',
            { 'Search-panel__form__button--on': random },
          )}
          onClick={handleRandomizeClick}
        >
          {random ? 'Randomize On' : 'Randomize Off'}
        </button>
      </div>
    </>
  );
};
