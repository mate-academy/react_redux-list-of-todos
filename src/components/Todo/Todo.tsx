import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { User } from '../User/User';

interface Props {
  todo: TodoWithUser;
  removeTask: (todo: TodoWithUser) => void;
}

const Todo: FC<Props> = ({ todo, removeTask }) => (
  <tr className="row">
    <User user={todo.user} />
    <td className="column">
      {todo.title}
      <button
        type="button"
        className="destroy"
        aria-label="Delete"
        data-name={todo.id}
        onClick={() => removeTask(todo)}
      />
    </td>
    <td className="column">{todo.completed ? 'Done' : '---'}</td>
  </tr>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeTask: (todo: TodoWithUser) => dispatch({
    type: 'DELETE_TASK',
    id: todo.id,
  }),
});

export default connect(null, mapDispatchToProps)(Todo);
