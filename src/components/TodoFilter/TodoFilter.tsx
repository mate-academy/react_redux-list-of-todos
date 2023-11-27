import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isQuery, setIsQuery] = useState('');
  const [isStatus, setIsStatus] = useState<Status>('all');

  const handleStatusChange = (option: string) => {
    setIsStatus(option as Status);
  };

  useEffect(() => {
    if (isStatus === 'all') {
      dispatch(filterActions.all(isStatus));
    }

    if (isStatus === 'active') {
      dispatch(filterActions.active(isStatus));
    }

    if (isStatus === 'completed') {
      dispatch(filterActions.completed(isStatus));
    }
  }, [isStatus]);

  useEffect(() => {
    if (isQuery) {
      dispatch(filterActions.query(isQuery));
    }

    return () => {
      dispatch(filterActions.query(''));
    };
  }, [isQuery]);

  const clearQuery = () => {
    dispatch(filterActions.resetQuery());
    setIsQuery('');
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
            title="select"
            value={isStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={isQuery}
          onChange={e => setIsQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {isQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              title="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
