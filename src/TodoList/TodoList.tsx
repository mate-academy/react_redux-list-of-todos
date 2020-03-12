import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../Store/ActionTypes';

interface Props {
  todos: Todo[];
  deleteItem: (id: number) => void;
}

const TodoListTemplate: FC<Props> = ({ todos, deleteItem }) => {
  return (
    <div>
      {todos.map(todo => {
        const {
          id,
          userId,
          user: { name },
          title,
          completed,
        } = todo;

        return (
          <div key={id} className="todo">
            <p className="todo__item">
              Task
              {' '}
              {id}
            </p>
            <p className="todo__item">
              UserID:&nbsp;
              {userId}
            </p>
            <p className="todo__item">
              User:&nbsp;
              {name}
            </p>
            <p className="todo__item">
              Task:&nbsp;
              {title}
            </p>
            <p className="todo__item">
              Completed:&nbsp;
              {completed ? '✔' : '❌'}
            </p>
            <button
              type="button"
              className="todo_item"
              onClick={() => deleteItem(id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    deleteItem: (id: number) => dispatch({ type: actions.DELETE_ITEM, payload: id }),
  };
};

export const TodoList = connect(mapStateToProps, mapDispatchToProps)(TodoListTemplate);
