/* eslint-disable */
import React, { useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

type Props = {
  inUse: boolean;
  setInUse: React.Dispatch<React.SetStateAction<boolean>>;
  todoModalUse: boolean;
  todos?: Todo[];
  setTodoModalUse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TodoList: React.FC<Props> = ({ todoModalUse, setInUse, setTodoModalUse, todos }) => {
  const noTodos = !todos?.length;
  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleEyeClick = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
    setInUse(true);
  };

  useEffect(() => {
    setInUse(true);

    setTimeout(() => {
      setInUse(false);
    }, 1000);
  }, [setInUse]);


  return (
    <>
      {noTodos && <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>}

      {todos && todos.length > 0 && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
        {todos?.map((todo) => (
          <tr key={todo.id} data-cy="todo">
            <td className="is-vcentered">{todo.id}</td>

            <td className="is-vcentered">
              {todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>

            <td className="is-vcentered is-expanded">
              <p className={todo.completed ? `has-text-success` : `has-text-danger`}>
                {todo.title}
              </p>
            </td>

            <td className="has-text-right is-vcentered">
              <button onClick={() => {
                setTodoModalUse(true);
                handleEyeClick(todo);
              }} data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  {currentTodo?.id === todo.id && todoModalUse ? <i className="far fa-eye-slash" /> : <i className="far fa-eye" />}
                </span>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>)}
    </>
  );
};
