import React, { FC, useCallback } from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../../actions/actions';

interface Props {
  todo: TodoWithUser;
  setDelete: (id: number) => void;
}

const TodoLayout: FC<Props> = ({ todo, setDelete }) => {
  const {
    id,
    user,
    title,
    completed,
  } = todo;

  const onDelete = useCallback(() => setDelete(id), [todo, id]);

  return (
    <tr className="table__row">
      <td className="table__cell">{id}</td>
      <td className="table__cell">{user.name}</td>
      <td className="table__cell">{title}</td>
      <td className="table__cell">{`${completed}`}</td>
      <td className="table__cell">
        <button
          type="button"
          onClick={onDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const mapDispatchToProps = {
  setDelete: deleteTodo,
};

export default connect(null, mapDispatchToProps)(TodoLayout);
