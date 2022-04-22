import {
  FC, memo, useState, useMemo,
} from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import { Todo } from '../Todo/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = memo(({ todos }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectCategory, setSelectCategory] = useState('All');

  const handleTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectCategory(event.target.value);
  };

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => (
        todo.title.toLowerCase().includes(todoTitle.toLowerCase())
      ))
      .filter(todo => {
        switch (selectCategory) {
          case 'Active':
            return !todo.completed;

          case 'Completed':
            return todo.completed;

          default:
            return todos;
        }
      });
  }, [todos, todoTitle, selectCategory]);

  return (
    <div className="TodoList">

      <div className="control">
        <input
          className="input is-hovered"
          type="text"
          placeholder="Enter todo's name"
          value={todoTitle}
          onChange={event => handleTitleChange(event)}
        />
      </div>

      <div className="select">
        <select
          value={selectCategory}
          onChange={event => handleCategoryChange(event)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map((todo: Todo) => (
            <li
              key={todo.id}
              className={classNames('TodoList__item', {
                'TodoList__item--checked': todo.completed,
                'TodoList__item--unchecked': !todo.completed,
              })}
            >
              <Todo todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
