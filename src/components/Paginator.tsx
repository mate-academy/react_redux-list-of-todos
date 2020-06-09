import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Pagination, Table, Dropdown } from 'semantic-ui-react';
import * as selectors from '../store';
import { setPage, setPerPage } from '../store/pagination';

const options = [
  { key: 1, text: '5 todos', value: 5 },
  { key: 2, text: '10 todos', value: 10 },
  { key: 3, text: '20 todos', value: 20 },
  { key: 4, text: '50 todos', value: 50 },
];

const Paginator = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectors.getPage);
  const perPage = useSelector(selectors.getPerPage);
  const totalPages = useSelector(selectors.getTotalPages);

  useEffect(() => {
    if (page > totalPages) {
      dispatch(setPage(totalPages));
    }
  }, [page, totalPages, dispatch]);


  return (
    <Table.HeaderCell colSpan="10" className="Pagination">
      <Dropdown
        placeholder="Select people per page"
        floated="left"
        selection
        name="perPage"
        value={perPage}
        onChange={(_, { value }: any) => {
          dispatch(setPerPage(value));
        }}
        options={options}
        direction="right"
      />
      { totalPages !== 1
      && (
        <Pagination
          floated="right"
          activePage={page}
          onPageChange={(_, { activePage }: any) => {
            dispatch(setPage(activePage));
          }}
          ellipsisItem={{
            content: <Icon name="ellipsis horizontal" />,
            icon: true,
          }}
          prevItem={{
            content: <Icon name="angle left" />,
            disabled: page === 1,
            icon: true,
          }}
          firstItem={{
            content: <Icon name="angle double left" />,
            disabled: page === 1,
            icon: true,
          }}
          nextItem={{
            content: <Icon name="angle right" />,
            disabled: page === totalPages,
            icon: true,
          }}
          lastItem={{
            content: <Icon name="angle double right" />,
            disabled: page === totalPages,
            icon: true,
          }}
          totalPages={totalPages}
        />
      )}
    </Table.HeaderCell>
  );
};

export default Paginator;
