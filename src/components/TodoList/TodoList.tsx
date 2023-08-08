import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodosTable } from '../TodosTable';

type Props = {
  todos: Todo[];
};

export const TodoList: FC<Props> = ({ todos }) => (
  <>
    {!todos.length ? (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    ) : (
      <TodosTable todos={todos} />
    )}
  </>
);
