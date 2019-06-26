import React from 'react';

function Toggle(props) {
  const { todoComplete, isChecked, todoId} = props;
  return (
    <input type="checkbox"
           checked={isChecked}
           onChange={() => todoComplete(todoId)}
    />
  );
}

export default Toggle;
