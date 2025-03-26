import React from 'react';
import { capitalizeString } from '../../../../helper';
import { Status } from '../../../../types/Status';
import { useAppDispatch } from '../../../../hooks';
import { actions as filterActions } from '../../../../features/filter';

export const StatusControl: React.FC = () => {
  const dispatch = useAppDispatch();
  const statusValues: Status[] = ['all', 'active', 'completed'];

  const setStatus = (value: Status) => {
    dispatch(filterActions.updateStatus(value));
  };

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as Status);
  };

  return (
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={selectHandler}>
          {statusValues.map((value, index) => (
            <option key={`${value}-${index}`} value={value}>
              {capitalizeString(value)}
            </option>
          ))}
        </select>
      </span>
    </p>
  );
};
