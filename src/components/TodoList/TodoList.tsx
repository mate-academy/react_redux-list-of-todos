import { useEffect, useState } from 'react';
import { getTodos } from '../../api';
import { Loader } from '../Loader/Loader';
import { TodoHead } from './TodoHead';
import { TodoItem } from './TodoItem';
import { Todo } from '../../types/Todo';
import { filterBy } from '../../utils/filterBy';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/todos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const todos = useAppSelector(state => state.todos);
  const [list, setList] = useState<Todo[]>([]);
  const [isProcesing, setIsProcesing] = useState(false);
  const { setTodo } = actions;

  useEffect(() => {
    setIsProcesing(true);
    getTodos()
      .then(response => {
        setList(response);
        dispatch(setTodo(response));
      })
      .finally(() => setIsProcesing(false));
  }, []);

  useEffect(() => {
    dispatch(setTodo(filterBy(list, query, status)));
  }, [query, status]);

  return (
    <>
      {isProcesing && <Loader />}
      {!!list.length && !todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {!!todos.length && (
          <TodoHead />
        )}

        <tbody>
          {todos.map(todo => (
            <TodoItem
              todo={todo}
              key={todo.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
