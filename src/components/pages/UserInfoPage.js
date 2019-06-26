import React from 'react';
import { selectUsers } from '../../selectors/selector';
import { connect } from 'react-redux';
import UserInfo from '../user-info';

function UserInfoPage({users, match}) {
  const user = users[match.params.id];
  return (
    <UserInfo user={user}/>
  );
}

const mapStateToProps = (state) => {
  return {
    users: selectUsers(state),
  };
};


export default connect(mapStateToProps, null)(UserInfoPage);
