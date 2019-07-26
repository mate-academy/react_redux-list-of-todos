import React, { useState } from 'react';
import TodoItem from './TodoItem';
import getData from './getData';

function TodoList() {
  const [isLoaded, setLoaded] = useState(false);
  const [todosWithUsers, setFinalArray] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTodos = async() => {
    setLoading(true);
    const todos = await getData('todos');
    const users = await getData('users');
    setFinalArray(() => todos.map(todo => ({
      todo,
      user: users.find(user => user.id === todo.userId),
    })));
    setLoading(false);
    setLoaded(true);
  };

  return (
    <div>
      {isLoaded ? (
        <table className="table">
          <thead className="table-head">
            <td>id</td>
            <td>title</td>
            <td>user</td>
          </thead>
          <tbody>
            {
              todosWithUsers.map(todo => (
                <TodoItem
                  todo={todo}
                  className="row"
                />
              ))
            }
          </tbody>
        </table>
      )
        : (
          <button
            type="button"
            onClick={() => getTodos()}
            disabled={loading}
          >
            {loading ? 'Loading' : 'Load'}
          </button>
        )
      }
    </div>
  );
}

export default TodoList;
