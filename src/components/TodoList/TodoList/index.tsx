import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectUser } from '../../../store/reducers/SelectedUserSlice';
import { deleteTodo, getAllTodos } from '../../../store/reducers/TodosSlice';
import TodoListFilter from '../TodoListFilter';
import TodoListItem from '../TodoListItem';
import './TodoList.scss';

type TodoListProps = {};

const TodoList: FC<TodoListProps> = () => {
  const [filterQuery, setFilterQuery] = useState('');
  const [filterBy, setFilterBy] = useState<string>('all');
  const dispatch = useAppDispatch();
  const {
    todo: {
      todos, isLoading, error,
    },
    selectedUserId: {
      selectedUserId,
    },
  } = useAppSelector(state => state);

  const handleUserSelect = useCallback((userId: number) => {
    dispatch(selectUser(userId));
  }, []);

  const handleTodoDelete = useCallback((todoId: number) => {
    dispatch(deleteTodo(todoId));
  }, []);

  const filteredTodos = todos
    .filter(todo => {
      switch (filterBy) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return todo;
      }
    })
    .filter(({ title }) => {
      return title.toLowerCase().includes(filterQuery.toLowerCase());
    });

  useEffect(() => {
    dispatch(getAllTodos());
  }, []);

  // Should create common error block to render instead
  // Same with Loading
  if (error) {
    return (
      <p>{error}</p>
    );
  }

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="TodoList__list-container">
          <TodoListFilter
            query={filterQuery}
            onQueryChange={setFilterQuery}
            filterOption={filterBy}
            onFilterChange={setFilterBy}
          />
          <ul className="TodoList__list">
            {todos.length && filteredTodos.map(todo => (
              <TodoListItem
                key={todo.id}
                todo={todo}
                isSelected={selectedUserId === todo.userId}
                onUserSelect={handleUserSelect}
                onTodoDelete={handleTodoDelete}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
