import React from 'react';
import { Button } from './Button';

export const SortPanel = () => {
  return (
    <div className="sort-panel">
      <Button
        title="sort by title"
        sortType="title"
      />
      <Button
        title="sort by status"
        sortType="status"
      />
      <Button
        title="sort by name"
        sortType="name"
      />
    </div>
  );
};
