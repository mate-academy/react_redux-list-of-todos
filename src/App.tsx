import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useDispatch } from 'react-redux';
import { setTodos } from './features/todos';
import { getTodos } from './api';
import { useEffect } from 'react';
import { useState } from 'react';
import { Todo } from './types/Todo';


export const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);


  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        dispatch(setTodos(todos));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const handleTodoSelect = (todo: Todo) => {
    setSelectedTodo(todo);
    setModalVisible(true);
  }

  return (
    <>
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter filter={filter} searchQuery={searchQuery} onFilterChange={setFilter} onSearchChange={setSearchQuery} />
          </div>

          <div className="block">
            {isLoading ? <Loader /> : <TodoList filter={filter} searchQuery={searchQuery} onTodoSelect={handleTodoSelect}/>}
          </div>
        </div>
      </div>
    </div>

    {modalVisible && (
        <TodoModal todo={selectedTodo} onModalToggle={setModalVisible} />
      )}
  </>
  )
};
