import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTodos, getSortType, getReverseValue } from '../store';
import { deleteTodo } from '../store/todos';
import { setSortType } from '../store/sort';
import { setReverseValue } from '../store/reverse';
import { FILTER_BUTTONS } from '../helpers/constants';
import Icon from '@material-ui/core/Icon';


export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos: Todo[] = useSelector(getTodos);
  const sortType: string = useSelector(getSortType);
  const isReverse: boolean = useSelector(getReverseValue);

  const handleClick = (type: string) => {
    if(!type){
      return;
    }
    if(type === sortType) {
      dispatch(setReverseValue(!isReverse));
    } else {
      dispatch(setReverseValue(false));
      dispatch(setSortType(type));
    }
  }

  const sortedTodos = useMemo(() => {
    const reverse = Number(isReverse) ? -1 : 1;

    switch (sortType) {
      case 'id':
        return [...todos].sort((a, b) => (a.id - b.id) * reverse);

      case 'name':
        return [...todos].sort((a, b) => (a.user.name.localeCompare(b.user.name)) * reverse);


      case 'title':
        return [...todos].sort((a, b) => (a.title.localeCompare(b.title))* reverse);

      case 'completed':
        return [...todos].sort((a, b) => (Number(a.completed) - Number(b.completed))* reverse);

        default: return todos;
    }
  }, [sortType, todos, isReverse]);

  return (
    <>
      <div className="buttons_panel">
        {FILTER_BUTTONS.map(({ id, title }) => (
          <button
            type="button"
            key={id}
            id={id.toString()}
            onClick={() => handleClick(title)}
          >
            {title}
          </button>
        ))}
      </div>
      <ul>
        {sortedTodos.map(todo => (
          <li className="todo" key={todo.id}>
            <span>{todo.id}</span>
            <span>{todo.user.name}</span>
            <span>{todo.title}</span>
            {todo.completed
              ? (
                <Icon
                  style={{ color: `#709e0e` }}
                  className="done"
                >
                  done
                </Icon>
                )
              : (<div></div>)
            }
            <span className="delete">
              <button
                type="button"
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="delete-btn"
              >
                <Icon fontSize="small">delete</Icon>
              </button>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
