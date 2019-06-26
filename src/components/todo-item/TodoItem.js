import React from 'react';
import User from '../user';

import './TodoItem.css'
import Toggle from '../toggle';
import Button from '../button';

function TodoItem({ todoId, title, user, completed, todoDelete }) {
  return (
    <div className="todo-item">
      <div className="task">
        {title}
      </div>
      <Toggle isChecked={completed} todoId={todoId}/>
      <User user={user} />
      <Button text="Delete" clickAction={() => todoDelete(todoId)}/>
    </div>
  );
}

export default TodoItem;
