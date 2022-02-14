import React, { useMemo, useState, useEffect } from 'react';
import './TodoListForm.scss';

import {
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadVisibleTodosAction, loadTodosAction } from '../../store/actions';
import { getTodosSelector } from '../../store/selectors';
import { getTodos } from '../../api/todos';

export const TodoListForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectValue, setSelectValue] = useState('all');

  const dispatch = useDispatch();
  const todos = useSelector(getTodosSelector);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => (todo.title.toLowerCase().includes(title.toLowerCase())));
  }, [title]);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const changeSelectValueHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectValue(value);
  };

  useEffect(() => {
    dispatch(loadVisibleTodosAction(filteredTodos));
  }, [title]);

  useEffect(() => {
    const getTodosBySelect = async () => {
      const todosFromServer = await getTodos(selectValue);

      dispatch(loadTodosAction(todosFromServer));

      if (title.length) {
        const newFilteredTodos = todosFromServer
          .filter(todo => (todo.title.toLowerCase().includes(title.toLowerCase())));

        dispatch(loadVisibleTodosAction(newFilteredTodos));
      } else {
        dispatch(loadVisibleTodosAction(todosFromServer));
      }
    };

    getTodosBySelect();
  }, [selectValue]);

  return (
    <div>
      <InputGroup className="mb-3">
        <div className="TodoListForm__control-panel">
          <div className="TodoListForm__input">
            <FormControl
              placeholder="Search by title"
              value={title}
              onChange={changeTitleHandler}
            />
          </div>
          <div className="TodoListForm__select">
            <Form.Select
              value={selectValue}
              onChange={changeSelectValueHandler}
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </Form.Select>
          </div>
        </div>
      </InputGroup>
    </div>
  );
};
