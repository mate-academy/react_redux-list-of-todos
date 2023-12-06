import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setChosenTodo: (par: Todo) => void;
  setIsModalLoading: (par: boolean) => void;
  chosenTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({
  todos,
  setChosenTodo,
  setIsModalLoading,
  chosenTodo,
}) => (
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
      {todos?.map((todo) => {
        const {
          id,
          title,
          completed,
        } = todo;

        function handleButton() {
          setChosenTodo(todo);
          setIsModalLoading(true);
        }

        return (
          <tr key={id} data-cy="todo" className="">
            <td className="is-vcentered">{id}</td>
            <td className="is-vcentered">
              {completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
                  'has-text-danger': !completed,
                  'has-text-success': completed,
                })}
              >
                {title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={handleButton}
              >
                <span className="icon">
                  <i className={cn({
                    'far fa-eye': !chosenTodo,
                    'far fa-eye-slash': chosenTodo,
                  })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
