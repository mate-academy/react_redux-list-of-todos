import { PropsWithChildren } from 'react';

export const TodoTable: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <table className="table is-narrow is-fullwidth">
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

      <tbody>{children}</tbody>
    </table>
  );
};
