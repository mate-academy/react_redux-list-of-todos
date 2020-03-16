import React, { FC } from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import { deleteTodoItem } from '../../store/store';
import { AppActions } from '../../actionsType/actionsType';

interface UserItemProps {
  todo: TodoWithUser;
  deleteItem: any;
}

const UserItem: FC<UserItemProps> = ({ todo, deleteItem }) => {
  const handleDelete = () => {
    deleteItem(todo.id);
  };

  return (
    <tr key={todo.id} className="user-item">
      <td
        className="user-item"
        style={{ backgroundColor: 'darkorange' }}
      >
        {todo.user.name}
      </td>
      <td
        className="user-item"
        style={{ backgroundColor: 'aquamarine' }}
      >
        {todo.title}
      </td>
      <td
        className={todo.completed ? 'succes-load user-item' : 'faild-load user-item'}
      >
        {todo.completed.toString()}
      </td>
      <td>
        <button type="button" onClick={handleDelete}>delete</button>
      </td>
    </tr>
  );
};

const mapStateToProps = (state: InitialStateInterface) => ({
  prepearedTodoList: state.prepearedTodoList,
});

const mapStateDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  deleteItem: (todoId: number) => dispatch(deleteTodoItem(todoId)),
});

export default connect(mapStateToProps, mapStateDispatchToProps)(UserItem);
