import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'semantic-ui-react';
import * as selectors from '../store';
import { setSortBy } from '../store/sort';
import TodoItem from './TodoItem';
import Paginator from './Paginator';

const headersConfig: HeadersConfig = {
  id: 'Id',
  user: 'Person',
  title: 'Description',
  completed: 'Completed',
  delete: 'Delete todo',
};

const TodoList = () => {
  const visibleTodos = useSelector(selectors.getVisibleTodos);
  const dispatch = useDispatch();

  return (
    <Table celled className="ui orange inverted TodoList" selectable>
      <Table.Header>
        <Table.Row className="TodoList-TableRow">
          {Object.keys(headersConfig).map(header => (
            <Fragment key={header}>
              {header !== 'delete'
                ? (
                  <Table.HeaderCell
                    className="TodoList-HeaderCell"
                    onClick={() => {
                      dispatch(setSortBy(header));
                    }}
                    content={headersConfig[header]}
                  />
                ) : (
                  <Table.HeaderCell
                    className="TodoList-HeaderCell TodoList-HeaderCell_delete"
                    content={headersConfig[header]}
                  />
                )}
            </Fragment>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {visibleTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
      </Table.Body>
      <Table.Footer>
        <Table.Row className="TodoList-TableRow">
          <Paginator />
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};

export default TodoList;
