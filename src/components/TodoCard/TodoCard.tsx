import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setSelectedTodo } from '../../features/currentTodo';

type Props = {
  todo: Todo;
  showModalWindow: (show: boolean) => void;
  isShowModal: boolean;
};

const TodoCard: React.FC<Props> = ({ todo, showModalWindow, isShowModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);

  const isSelectedTodo = selectedTodo?.id === todo.id;

  const handleSelectTodo = (selectedElement: Todo) => {
    dispatch(setSelectedTodo(selectedElement));
  };

  return (
    <tr
      data-cy="todo"
      className={cn({
        'has-background-info-light':
          selectedTodo?.id === todo?.id && isShowModal,
      })}
    >

      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p
          className={cn({
            'has-text-danger': !todo.completed,
            'has-text-success': todo.completed,
          })}
        >
          {todo.title}
        </p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            handleSelectTodo(todo);
            showModalWindow(true);
          }}
        >

          <span className="icon">
            <i
              className={cn('far', {
                'fa-eye': !isSelectedTodo,
                'fa-eye-slash': isSelectedTodo,
              })}
            />
          </span>
          
        </button>
      </td>

    </tr>
  );
};

export default TodoCard;
