import classNames from 'classnames';
import {
  FC, useEffect, useMemo, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, removeTodo } from '../../api/api';
import {
  removeTodoAction, selectedUserIdSelector, todosSelector, todosAction,
  selectUserIdAction,
} from '../../store';
import { SelectInput } from '../InputComponents/SelectInput';
import { TextInput } from '../InputComponents/TextInput';
import './todoList.scss';

export const TodoList: FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelector);
  const selectedUserId = useSelector(selectedUserIdSelector);

  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState('all');

  useEffect(() => {
    fetchTodos().then(todosFromServer => {
      dispatch(todosAction(todosFromServer));
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const eraseTodo = (todoId: number) => {
    removeTodo(todoId).then(id => {
      if (id) {
        dispatch(removeTodoAction(todoId));
      }
    });
  };

  const options = [
    { id: 1, name: 'all' },
    { id: 2, name: 'active' },
    { id: 3, name: 'completed' },
  ];

  const filteredTodos = useMemo(() => (
    todos
      .filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()))
      .filter(todo => {
        switch (selectedOption) {
          case 'active':
            return todo.completed === false;
          case 'completed':
            return todo.completed === true;
          case 'all':
          default:
            return todo;
        }
      })
  ), [todos, title, selectedOption]);

  return (
    <div className="TodoList">
      <h2 className="title">Todos:</h2>

      <TextInput
        name="title"
        label=""
        inputValue={title}
        errorMessage=""
        placeholder="Search by title"
        onChange={handleInputChange}
      />

      <SelectInput
        name="filter"
        label=""
        inputValue={selectedOption}
        errorMessage=""
        options={options}
        onChange={handleSelectChange}
      />

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              className={classNames(
                'TodoList__item',
                { 'TodoList__item--unchecked': !todo.completed },
                { 'TodoList__item--checked': todo.completed },
              )}
              key={todo.id}
            >
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                />
                <p>{todo.title}</p>
              </label>

              <div>
                <button
                  className={classNames(
                    'TodoList__user-button',
                    {
                      'TodoList__user-button--selected':
                        todo.userId === selectedUserId,
                    },
                  )}
                  type="button"
                  onClick={() => dispatch(selectUserIdAction(todo.userId))}
                >
                  {`User #${todo.userId}`}
                </button>

                <button
                  className="TodoList__user-button"
                  type="button"
                  onClick={() => eraseTodo(todo.id)}
                >
                  {`Delete #${todo.id}`}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
