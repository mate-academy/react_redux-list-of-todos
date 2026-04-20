import React from 'react';

type Props = {
  value: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({ value, onChangeInput }) => {
  return (
    <input
      data-cy="searchInput"
      type="text"
      className="input"
      placeholder="Search..."
      value={value}
      onChange={onChangeInput}
    />
  );
};
