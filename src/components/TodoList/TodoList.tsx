import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todosLoad } from '../../reducer/actions';
import { RootState } from '../../reducer/rootReducer';
import { TodoComponent } from '../TodoComponent/TodoComponent';
import { Todo } from "../../Types/Todo";
import './TodoList.scss';

type Props = {
  filterQuery: string,
  sortQuery: string,
};

export const TodoList: React.FC<Props> = ({ filterQuery, sortQuery }) => {
  const todos = useSelector((state: RootState) => state.todosReducer.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todosLoad());
  }, []);

  const filterCallback = (todo: Todo) => {
    const newTodo = todo.title.toLocaleLowerCase().includes(filterQuery.toLowerCase());

    if (sortQuery === 'completed') {
      return newTodo && todo.completed;
    }

    if (sortQuery === 'active') {
      return newTodo && !todo.completed;
    }

    return newTodo;
  };

  return (
    <ul className="todo-list">
      {todos?.filter((todo: Todo) => filterCallback(todo)).map((todo: any) => (
        <TodoComponent
          todo={todo}
          key={todo.id}
        />
      ))}
    </ul>
  );
};
