import React from 'react';
import { options } from '../../constants/constants';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  onSelectOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<Props> = ({ onSelectOption, status }) => {
  return (
    <select data-cy="statusSelect" onChange={onSelectOption} value={status}>
      {options.map(option => {
        const [value, name] = option;

        return (
          <option key={value} value={value}>
            {name}
          </option>
        );
      })}
    </select>
  );
};
