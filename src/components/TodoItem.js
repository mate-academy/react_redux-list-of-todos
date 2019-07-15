import React from 'react'

export default function TodoItem(props) {
  const {
    title,
    user,
    email,
    status,
    index
  } = props
  console.log(status)
  return (

    <tr>
      <td>{title}</td>
      <td className="userInfo">
        <a className="email" href={`mailto: ${email}`}>
          <span className="noselect">&#9993;</span>
        </a>
        {user}
      </td>
      <td className={status ? 'completed' : 'notCompleted'}>{status ? 'completed' : 'not completed'}</td>
      <td onClick={() => props.removeTodo(index)} className='deleted'>&times;</td>
    </tr>
  )
}
