import React, { FC, useState } from 'react';
import { UserItem } from '../UserItem/UserItem';

interface Props {
  prepearedTodoList: TodoWithUser[];
}

export const UserList: FC<Props> = ({ prepearedTodoList }) => {
  const [visibleUserList, setVisibleUserList] = useState([...prepearedTodoList]);

  function sortedBy(param: string) {
    switch (param) {
      case 'name':
        setVisibleUserList(
          [...prepearedTodoList]
            .sort((a, b) => a.user[param].localeCompare(b.user[param])),
        );
        break;
      case 'title':
        setVisibleUserList(
          [...prepearedTodoList]
            .sort((a, b) => a[param].localeCompare(b[param])),
        );
        break;
      case 'completed':
        setVisibleUserList(
          [...prepearedTodoList]
            .sort((a, b) => Number(b.completed) - Number(a.completed)),
        );
        break;
      default:
        break;
    }
  }

  return (
    <table className="user-list">
      <thead className="user-list-title">
        <tr className="user-list-title-item-row">
          <th className="user-list-title-item-column">
            <button
              className="sorted-btn"
              type="button"
              onClick={() => sortedBy('name')}
            >
              Name
            </button>
          </th>
          <th className="user-list-title-item-column">
            <button
              className="sorted-btn"
              type="button"
              onClick={() => sortedBy('title')}
            >
              Title
            </button>
          </th>
          <th className="user-list-title-item-column">
            <button
              className="sorted-btn"
              type="button"
              onClick={() => sortedBy('completed')}
            >
              Completed
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        {
          visibleUserList.map(todo => (
            <UserItem key={todo.id} todo={todo} />
          ))
        }
      </tbody>
    </table>
  );
};
