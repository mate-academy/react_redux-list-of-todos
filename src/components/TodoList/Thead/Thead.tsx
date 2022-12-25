import { FC, memo } from 'react';

export const Thead: FC = memo(() => {
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
});
