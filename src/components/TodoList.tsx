import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Todo } from './Todo';

interface Props {
  data: Todo[];
}

export const TodoListTemplate: FC<Props> = ({ data }) => (
  <>
    <h1>Todo List</h1>
    <ul className="card-list">
      {data.map(item => (
        <li className="card-item" key={item.id}>
          <>
            <Todo {...item} />
          </>
        </li>
      ))}
    </ul>
  </>
);

const mapStateToProps = (state: GlobalState) => ({
  ...state,
  data: state.todos,
});

export const TodoList = connect(mapStateToProps)(TodoListTemplate);
