import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TODOSTYPE } from '../../api/interface';
import { removeSelectedTodo } from '../../store/todosList';
import './RemoveTodo.scss';

type RemoveType = {
  todo: TODOSTYPE;
  setTodoId: Function;
  setUpdateList: Function;
};

export const RemoveTodo: React.FC<RemoveType> = ({ todo, setTodoId, setUpdateList }) => {
  const [changedTodo, setChangedTodo] = useState<TODOSTYPE>(todo);
  const dispatch = useDispatch();

  const handleChangedTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setChangedTodo({
        ...changedTodo,
        title: event.target.value,
      });
    }
  };

  const handleSaveChangedTodo = () => {
    dispatch(removeSelectedTodo(changedTodo));
    setUpdateList(
      (prevList: TODOSTYPE[]) => prevList.map(
        (item: TODOSTYPE) => (item.id === changedTodo.id ? changedTodo : item),
      ),
    );
    setTodoId(0);
  };

  return (
    <>
      <label htmlFor="title">
        <input
          id="title"
          type="text"
          value={changedTodo.title}
          className="remove-todo-title"
          onChange={handleChangedTodo}
        />
      </label>

      <div>
        <button
          className="
                TodoList__user-button
                TodoList__user-button--remove
                button
              "
          type="button"
          onClick={handleSaveChangedTodo}
        >
          Save
        </button>

      </div>
    </>
  );
};
