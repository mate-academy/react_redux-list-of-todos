import React from 'react';
import { useSelector } from 'react-redux';
import { Icon, Pagination, Table, Dropdown } from 'semantic-ui-react';
import * as selectors from '../store';

const options = [
  { key: 1, text: '5 todos', value: 5 },
  { key: 2, text: '10 todos', value: 10 },
  { key: 3, text: '20 todos', value: 20 },
  { key: 4, text: '50 todos', value: 50 },
];

const Paginator = () => {
  const todos = useSelector(selectors.getTodos);
  const totalPages = Math.ceil(todos.length / 10);
  // console.log(totalPages)

  return (
    <Table.HeaderCell colSpan="10" className="Pagination">
      <Dropdown
        placeholder="Select people per page"
        floated="left"
        selection
        name="perPage"
        value={10}
        onChange={() => {}}
        options={options}
        direction="right"
      />
      { totalPages !== 1
      && (
        <Pagination
          floated="right"
          activePage={1}
          onPageChange={() => {}}
          ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true,
          }}
          prevItem={{
            content: <Icon name="angle left" />,
            // disabled: page === 1,
            icon: true,
          }}
          firstItem={{
            content: <Icon name="angle double left" />,
            // disabled: page === 1,
            icon: true,
          }}
          nextItem={{
            content: <Icon name="angle right" />,
            // disabled: page === totalPages,
            icon: true,
          }}
          lastItem={{
            content: <Icon name="angle double right" />,
            // disabled: page === totalPages,
            icon: true,
          }}
          totalPages={totalPages}
        />
      )}
    </Table.HeaderCell>
  );
};

export default Paginator;
