import React from 'react';

type Props = {
  id: number;
  title: string;
  completed: boolean;
};

export const TableItem: React.FC<Props> = ({ id, title, completed }) => {
  return (
    <tr data-cy="todo">
      <td className="is-vcentered">{id}</td>
      <td className="is-vcentered"> </td>

      <td className="is-vcentered is-expanded">
        <p className="has-text-danger">{title}</p>
      </td>

      <td className="has-text-right is-vcentered">
        <button data-cy="selectButton" className="button" type="button">
          <span className="icon">
            <i className="far fa-eye" />
          </span>
        </button>
      </td>
    </tr>
  );
};
