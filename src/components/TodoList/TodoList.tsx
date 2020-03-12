import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Todo } from '../Todo';
import { deleteSomeTodo } from '../../store';

interface Props {
  todos: TodoWithUser[];
  deleteTodo: (value: number) => void;
}

const TodoList: FC<Props> = (props) => {
  const { todos, deleteTodo } = props;

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="cell cell--head">Name</th>
          <th className="cell cell--head">Title</th>
          <th className="cell cell--head">completed</th>
          <th className="cell cell--head">Delete</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = { deleteTodo: deleteSomeTodo };


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
