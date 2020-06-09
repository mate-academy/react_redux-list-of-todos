import React from 'react';
import { Table } from 'semantic-ui-react';

type PropsUser = {
  user?: User;
};

const User: React.FC<PropsUser> = ({ user }) => (
  <Table.Cell>{user?.name || ''}</Table.Cell>
);

export default User;
