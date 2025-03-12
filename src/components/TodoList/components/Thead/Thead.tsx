import React from 'react';

export const Thead: React.FC = () => {
  return (
    <thead>
      <tr>
        <th>#</th>

        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>

        <th>Title</th>
        <th> </th>
      </tr>
    </thead>
  );
};
