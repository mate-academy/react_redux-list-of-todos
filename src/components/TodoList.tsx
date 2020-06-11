import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getVisibleTodos} from "../reducers";
import Button from "./Button";
import {deleteTodo, sortBy} from "../actions";


const TodoList: React.FC = () => {

  const dispatch = useDispatch();
  const todos = useSelector(getVisibleTodos)

  return (
    <table className="table table-sortable">
      <thead>
      <tr>
        <th scope="col" className="pointer asc" onClick={() => dispatch(sortBy('id'))}>#ID</th>
        <th scope="col" className="pointer" onClick={() => dispatch(sortBy('title'))}>Todo</th>
        <th scope="col">Username</th>
        <th scope="col" className="pointer" onClick={() => dispatch(sortBy('completed'))}>Completed</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      {todos.map(({id, title, completed, user}) => (

        <tr key={id}>
          <th scope="row">{id}</th>
          <td>{title}</td>
          <td>{user?.name}</td>
          <td>{completed
            ? <span className="badge badge-pill badge-success">Success</span>
            : <span className="badge badge-pill badge-danger">Danger</span>}
          </td>
          <td>
            <Button
              text={'X'}
              status="danger"
              onClick={() => {
                dispatch(deleteTodo(id))
              }}/></td>
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default TodoList;
