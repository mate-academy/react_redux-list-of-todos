import React from 'react';
import { Status } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

const options = [
  { value: Status.All, label: 'All' },
  { value: Status.Active, label: 'Active' },
  { value: Status.Completed, label: 'Completed' },
];

export const Select: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state);

  const onSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as Status;

    dispatch(filterActions.setStatus(status) as any);
  };

  return (
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter.status}
          onChange={onSelectionChange}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </span>
    </p>
  );
};
