import React, { Dispatch, FC } from 'react';
import { connect } from 'react-redux';
import UserItem from '../UserItem/UserItem';
import { setSortedTodoList } from '../../store/store';
import { AppActions } from '../../actionsType/actionsType';

const UserList: FC<any> = ({ prepearedTodoList, sortBy, sortedTodoList }) => {
  function sortedBy(param: string) {
    switch (param) {
      case 'name':
        sortBy(
          [...prepearedTodoList]
            .sort((a, b) => a.user[param].localeCompare(b.user[param])),
        );
        break;
      case 'title':
        sortBy(
          [...prepearedTodoList]
            .sort((a, b) => a[param].localeCompare(b[param])),
        );
        break;
      case 'completed':
        sortBy(
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
          sortedTodoList.map((todo: TodoWithUser) => (
            <UserItem key={todo.id} todo={todo} />
          ))
        }
      </tbody>
    </table>
  );
};

const mapStateToProps = (state: InitialStateInterface) => ({
  sortedTodoList: state.sortedTodoList,
  prepearedTodoList: state.prepearedTodoList,
});

const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  sortBy: (sortedTodoList: TodoWithUser[]) => dispatch(setSortedTodoList(sortedTodoList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
