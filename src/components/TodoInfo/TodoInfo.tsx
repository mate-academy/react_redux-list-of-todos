import React from 'react';
import { Todo } from '../../types/Todo';

type TodosType = {
  todo: Todo,
};

export const TodoInfo: React.FC<TodosType> = ({ todo }) => {
  const { id, title } = todo;

  return (
    <>
      <tr data-cy="todo" className="has-background-info-light">
        <td className="is-vcentered">{id}</td>
        <td className="is-vcentered"> </td>

        <td className="is-vcentered is-expanded">
          <p className="has-text-danger">{title}</p>
        </td>

        <td className="has-text-right is-vcentered">
          <button data-cy="selectButton" className="button" type="button">
            <span className="icon">
              <i className="far fa-eye-slash" />
            </span>
          </button>
        </td>
      </tr>
    </>
  );
};
