import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TodoWithUser, State } from '../../constants/types';
import { TodoItem } from '../TodoItem/TodoItem';
import {
  getTodos,
  sortById,
  sortByName,
  sortByStatus,
  sortByTitle,
} from '../../store/actionCreators';

interface Props {
  todos: TodoWithUser[];
  sortByTitle: () => void;
  sortByName: () => void;
  sortByStatus: () => void;
  sortById: () => void;
}

export const TodoListTemplate: FC<Props> = (props) => {
  const { todos } = props;
  return (
    <table className="table is-hoverable">
      <thead className="thead">
        <tr className="tr">
          <th className="th" onClick={props.sortById}>id</th>
          <th className="th" onClick={props.sortByTitle}>title</th>
          <th className="th" onClick={props.sortByStatus}>completed</th>
          <th className="th" onClick={props.sortByName}>user</th>
          <th className="th">Delete option</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {todos.map((todo: TodoWithUser) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))}
      </tbody>
    </table>
  );
};

const mapDispatchToProps = {
  sortById,
  sortByName,
  sortByTitle,
  sortByStatus,
};

const mapStateToProps = (state: State) => ({
  todos: getTodos(state),
});

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListTemplate);
