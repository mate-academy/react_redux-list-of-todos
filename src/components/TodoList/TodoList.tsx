import {
  FC, memo, useState, useMemo,
} from 'react';
import classNames from 'classnames';

import { TodoItem } from '../TodoItem/TodoItem';
import Form from '../TodoForm/TodoForm';
import { Todo } from '../../types/todo.type';
import './TodoList.scss';

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
      <Form
        categoryValue={selectCategory}
        titleValue={todoTitle}
        onChangeInput={(event) => {
          handleTitleChange(event);
        }}
        onChangeSelect={(event) => {
          handleCategoryChange(event);
        }}
      />

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
              <TodoItem todo={todo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
