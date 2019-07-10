import React from 'react'

export default function TodoItem(props) {
  return (
    <tr>
      <td>{props.todo.user.name}</td>
      <td>{props.todo.user.email}</td>
      <td>{props.todo.title}</td>
      <td className={props.todo.completed ? 'completed' : 'notCompleted'}>{props.todo.completed.toString()}</td>
      <td onClick={() => props.removeTodo(props.todo.id)} className='deleted'>X</td>
    </tr>
  )
}
