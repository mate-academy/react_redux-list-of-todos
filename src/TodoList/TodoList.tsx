import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TodoWithUser } from '../types';
import Todo from '../Todo/Todo';
import { sortByName, sortByTitle, sortByCompleted } from '../actionCreators';
import './TodoList.css';

interface Props {
  todos: TodoWithUser[];
  handleSortByName(): void;
  handleSortByTitle(): void;
  handleSortByCompleted(): void;
}

const TodoList: FC<Props> = (props) => {
  const {
    todos,
    handleSortByName,
    handleSortByTitle,
    handleSortByCompleted,
  } = props;

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={handleSortByName}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={handleSortByTitle}
            >
              Todo
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={handleSortByCompleted}
            >
              Status
            </button>
          </th>
          <th>
            <span />
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {todos.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSortByName: () => dispatch(sortByName),
  handleSortByTitle: () => dispatch(sortByTitle),
  handleSortByCompleted: () => dispatch(sortByCompleted),
});

export default connect(null, mapDispatchToProps)(TodoList);
