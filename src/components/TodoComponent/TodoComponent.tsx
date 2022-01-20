import classnames from 'classnames';
import { useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Todo } from "../../Types/Todo";
import './TodoComponent.scss';

type Props = {
  todo: Todo,
};

export const TodoComponent: React.FC<Props> = ({
  todo,
}) => {
  const [searchParams] = useSearchParams() || '';
  const navigate = useNavigate();

  const handleButtonClick = useCallback((id: number) => {
    if (id > 0) {
      searchParams.set('userId', id.toString());
    } else {
      searchParams.delete('userId');
    }

    navigate(`?${searchParams.toString()}`, { replace: true });
  }, []);

  return (
    <li className="todo">
      {todo.completed ? (
        <AiOutlineCheckCircle
          className="todo__status"
          color="green"
        />
      ) : (
        <AiOutlineCloseCircle
          className="todo__status"
          color="red"
        />
      )}
      <p className="todo__text">
        {todo.title}
      </p>
      <button
        type="button"
        className={classnames('todo__userId',
          { 'todo__userId active': +(searchParams.get('userId') || '') === todo.userId })}
        onClick={() => handleButtonClick(todo.userId)}
      >
        {todo.userId}
      </button>
    </li>
  );
};
