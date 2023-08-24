import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Filter } from './types/Filter';
import { actions as TodosReducer } from './store/TodosReducer';
import { useTypedSelector } from './components/hooks/useTypedSelector';
import {
  Loader,
  TodoFilter,
  TodoList,
  TodoModal,
} from './components';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const todos = useTypedSelector<Todo[]>(state => state.todos.todos);
  const [userId, setUserId] = useState(0);
  const [filteredBy, setFilteredBy] = useState('all');
  const [query, setQuery] = useState('');

  const isLoading = useTypedSelector(state => state.todos.isLoading);
  const selectedTodo = useTypedSelector(state => state.todos.selectedTodoId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(TodosReducer.getTodos());
  }, []);

  const changeFilteredBy = (filterType: string) => {
    setFilteredBy(filterType);
  };

  const changeQuery = (input: string) => {
    setQuery(input);
  };

  const handleQueryFiltering = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  const visibleTodos = useMemo(() => {
    switch (filteredBy) {
      case Filter.ALL:
        return todos
          .filter(todo => handleQueryFiltering(todo.title));

      case Filter.ACTIVE:
        return todos
          .filter(todo => !todo.completed && handleQueryFiltering(todo.title));

      case Filter.COMPLETED:
        return todos
          .filter(todo => todo.completed && handleQueryFiltering(todo.title));

      default:
        return todos;
    }
  }, [filteredBy, query, todos]);

  const selectUser = (id: number, todoId: number) => {
    setUserId(id);
    dispatch(TodosReducer.setTodo(todoId));
  };

  const usersTodo = todos.find(todo => todo.id === selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                changeFilteredBy={changeFilteredBy}
                changeQuery={changeQuery}
                query={query}
              />
            </div>

            <div className="block">
              {isLoading && <Loader />}
              <TodoList todos={visibleTodos} selectUser={selectUser} />
            </div>
          </div>
        </div>
      </div>

      {!!userId && (
        <TodoModal
          todo={usersTodo}
          selectedUser={userId}
          selectUser={selectUser}
        />
      )}
    </>
  );
};
