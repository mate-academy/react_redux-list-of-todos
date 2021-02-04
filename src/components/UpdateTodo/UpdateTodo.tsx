import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TODOSTYPE } from '../../api/interface';
import { updateTodo } from '../../store/todosList';
import './UpdateTodo.scss';

type UpdateType = {
  todo: TODOSTYPE;
  setTodoId: Function;
  setUpdateList: Function;
};

export const UpdateTodo: React.FC<UpdateType> = ({ todo, setTodoId, setUpdateList }) => {
  const [changedTodo, setChangedTodo] = useState<TODOSTYPE>(todo);
  const dispatch = useDispatch();

  const handleChangedTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value) {
      setChangedTodo({
        ...changedTodo,
        title: value,
      });
    }
  };

  const handleSaveChangedTodo = () => {
    dispatch(updateTodo(changedTodo));
    setUpdateList(
      (prevList: TODOSTYPE[]) => prevList.map(
        item => (item.id === changedTodo.id ? changedTodo : item),
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
          className="update-todo-title"
          onChange={handleChangedTodo}
        />
      </label>

      <div>
        <button
          className="
                TodoList__user-button
                TodoList__user-button--update
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
