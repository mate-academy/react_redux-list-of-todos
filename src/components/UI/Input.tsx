/* eslint-disable no-console */
import { FC, useState } from 'react';

export const Input: FC = () => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  console.log(todoTitle);

  return (
    <input
      className="input is-hovered"
      type="text"
      placeholder=" todo's name"
      value={todoTitle}
      onChange={event => handleTitleChange(event)}
    />
  );
};
