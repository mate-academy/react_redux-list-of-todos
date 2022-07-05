import React from 'react';
import classNames from 'classnames';
import './ControlPanel.scss';

type Props = {
  query: string;
  sortBy: string;
  randomSort: boolean;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  changeSortBy: React.Dispatch<React.SetStateAction<string>>;
  changeRandomSort: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ControlPanel: React.FC<Props> = ({
  query: value,
  setQuery,
  sortBy,
  changeSortBy,
  randomSort,
  changeRandomSort,
}) => {
  return (
    <div className="ControlPanel App__ControlPanel">
      <h2 className="title ControlPanel__title">
        Control panel
      </h2>
      <div className="sorting-form ControlPanel__sorting-form">
        <input
          className="sorting-form__input"
          type="text"
          placeholder="Search todo"
          value={value}
          onChange={({ target }) => setQuery(target.value)}
        />

        <div className="sorting-form__footer">
          <select
            className="button sorting-form__select"
            value={sortBy}
            onChange={({ target }) => changeSortBy(target.value)}
          >
            <option value="">Select sorting option</option>
            <option value="all">All todos</option>
            <option value="completed">Completed todos</option>
            <option value="active">Active todos</option>
          </select>
          <button
            className={classNames(
              'button',
              'sorting-form__button',
              { 'button--active': randomSort },
            )}
            type="button"
            onClick={() => changeRandomSort(!randomSort)}
          >
            Randomize
          </button>
        </div>
      </div>
    </div>
  );
};
