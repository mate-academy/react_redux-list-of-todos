import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from './Todo';
import { getData, deleteItem as deleteI } from '../store';

const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(getData);

  const deleteItem = (id: number) => {
    dispatch(deleteI(id));
  };

  return (
    <>
      <table className="table">
        <caption><strong>ToDo List</strong></caption>
        <thead>
          <tr>
            <th>Status</th>
            <th>Title</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(item => (
            <Todo
              deleteItem={deleteItem}
              todo={item}
              key={item.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TodoList;
