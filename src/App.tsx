import React, { useEffect, useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useDispatch } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { useAppSelector } from './app/hooks';
import { actions as todosActions } from './features/todos';
import { Select } from './types/Select';
import { actions as currentTodoActions } from './features/currentTodo';

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedValue = useAppSelector(state => state.filter.status);
  const inputValue = useAppSelector(state => state.filter.query);

  const [showModal, setShowModal] = useState(false);

  async function loadTodos() {
    const todosServer = await getTodos();

    dispatch(todosActions.setTodos(todosServer));
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const showTodo = (clickedTodo: Todo) => {
    dispatch(currentTodoActions.setTodo(clickedTodo));
    setShowModal(true);
  };

  const closeModal = () => {
    dispatch(currentTodoActions.removeTodo());
    setShowModal(false);
  };

  const filterTodos = (selectValue: string, inputVal: string) => {
    let filterValues = todos;

    switch (selectValue) {
      case Select.Active:
        filterValues = filterValues.filter(toDo => !toDo.completed);
        break;

      case Select.Completed:
        filterValues = filterValues.filter(toDo => toDo.completed);
        break;

      default:
        break;
    }

    filterValues = filterValues.filter(toDo => (
      toDo.title.toLowerCase().includes(inputVal.toLowerCase())
    ));

    return filterValues;
  };

  const visibleTodos = useMemo(() => {
    return filterTodos(selectedValue, inputValue);
  }, [todos, selectedValue, inputValue]);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!todos.length && <Loader />}
              <TodoList
                todos={visibleTodos}
                showTodo={showTodo}
                showModal={showModal}
              />
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <TodoModal closeModal={closeModal} />
      )}
    </>
  );
};
