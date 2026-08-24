/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { todoStore } from '../src/components/Redux/Redux';

export const App: React.FC = () => {
  const [array, setArray] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [matching, setMatching] = useState('all');
  const [titling, setTitling] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(
    todoStore.getState(),
  );

  useEffect(() => {
    const unsubscribe = todoStore.subscribe(() => {
      setSelectedTodo(todoStore.getState());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getTodos()
      .then(fetchedTodos => {
        setArray(fetchedTodos);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const PreparedArray = array.filter(obj => {
    const fExam =
      matching === 'all' ||
      (matching === 'active' && !obj.completed) ||
      (matching === 'completed' && obj.completed);

    const sExam = obj.title
      .toLowerCase()
      .includes(titling.toLowerCase().trim());

    return fExam && sExam;
  });

  return (
    <div className="section">
      <div className="container">
        <div className="box">
          <h1 className="title">Todos:</h1>

          <div className="block">
            <TodoFilter
              setMatching={setMatching}
              matching={matching}
              titling={titling}
              setTitling={setTitling}
            />
          </div>

          <div className="block">
            {loading ? (
              <Loader />
            ) : (
              <TodoList
                array={PreparedArray}
                onselect={todoStore.setSelectedTodo}
                selectedTodo={selectedTodo}
              />
            )}
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedobj={selectedTodo}
          onClose={() => todoStore.setSelectedTodo(null)}
        />
      )}
    </div>
  );
};
