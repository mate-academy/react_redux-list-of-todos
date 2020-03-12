import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { Todo } from './Todo';

interface Props {
  todos: Todo[];
  query: string;
}

export const TodoListTemplate: FC<Props> = ({ todos, query }) => {
  const todosToShow = useMemo(() => {
    if (!todos.length) {
      return [];
    }

    switch (query) {
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case 'user':
        return [...todos
          .sort((a, b) => {
            if (a.user && b.user) {
              return a.user.name.localeCompare(b.user.name);
            }

            return 0;
          })];
      case 'completed':
        return [...todos
          .sort((a, b) => {
            return Number(a.completed) - Number(b.completed);
          })];
      case 'reverse':
        return [...todos.reverse()];
      default:
        return todos;
    }
  }, [query, todos]);

  return (
    <>
      <h1>Todo List</h1>
      <ul className="card-list">
        {todosToShow.map(todo => (
          <li className="card-item" key={todo.id}>
            <>
              <Todo {...todo} />
            </>
          </li>
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state: { todosReducer: TodoState; queryReducer: QuerySort }) => ({
  todos: state.todosReducer.todos,
  query: state.queryReducer.query,
});

export const TodoList = connect(mapStateToProps)(TodoListTemplate);
