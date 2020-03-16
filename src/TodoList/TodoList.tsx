import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TodosWithUsers } from '../types';
import Todo from '../Todo/Todo';
import { InitialState } from '../store';
import { sortedTodos } from '../actionCreators';
import './TodoList.css';

interface Props {
  todos: TodosWithUsers;
  setTodos: (todoWithUser: TodosWithUsers) => void;
}

const TodoList: FC<Props> = (props) => {
  const {
    todos,
    setTodos,
  } = props;

  const handleFilter = (field: string) => {
    const filteredTodos = [...todos];

    switch (field) {
      case 'name':
        setTodos(filteredTodos.sort((a, b) => a.user.name.localeCompare(b.user.name)));
        break;
      case 'title':
        setTodos(filteredTodos.sort((a, b) => a.title.localeCompare(b.title)));
        break;
      case 'completed':
        setTodos(filteredTodos.sort((a, b) => Number(a.completed) - Number(b.completed)));
        break;
      default:
    }
  };

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={() => handleFilter('name')}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={() => handleFilter('title')}
            >
              Todo
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button table__button-header"
              onClick={() => handleFilter('completed')}
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

const mapStateToProps = (state: InitialState) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTodos: (todoWithUser: TodosWithUsers) => dispatch(sortedTodos(todoWithUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
