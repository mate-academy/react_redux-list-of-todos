import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';
import TodoItem from './TodoItem';

interface SortButton extends Ikey {
  id: string;
  user: string;
  title: string;
  completed: string;
}

const headers: SortButton = {
  id: 'Id',
  user: 'Person',
  title: 'Description',
  completed: 'Completed',
};

declare type MyCallback = (myArgument: string) => (a: Todo, b: Todo) => number;

type PropsTodoList = {
  list: Todo[];
};

const TodoList: React.FC<PropsTodoList> = ({ list }) => {
  const [todos, sortTodos] = useState(list);
  const [active, setActive] = useState('id');
  const [isSorted, setSorted] = useState(true);

  const sortType: MyCallback = (field) => {
    switch (typeof list[0][field]) {
      case 'string':
        return (a, b) => a[field].localeCompare(b[field]);
      case 'object':
        return (a, b) => a[field].name.localeCompare(b[field].name);
      default:
        return (a, b) => a[field] - b[field];
    }
  };

  const sortList = (field: string) => {
    const callback = sortType(field);

    if (active !== field) {
      sortTodos(todos.sort(callback));
      setActive(field);
      setSorted(true);
    } else {
      isSorted
        ? sortTodos(todos.reverse())
        : sortTodos(todos.sort(callback));
      setSorted(!isSorted);
    }
  };

  return (
    <Table celled className="ui purple inverted" selectable>
      <Table.Header>
        <Table.Row>
          {Object.keys(headers).map(header => (
            <Table.HeaderCell
              className="table__button"
              key={header}
              onClick={() => sortList(header)}
            >
              {headers[header]}
            </Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {list.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </Table.Body>
    </Table>
  );
};

export default TodoList;
