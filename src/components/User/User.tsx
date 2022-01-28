// import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, clearUser } from '../../store/index';

const UserWrap = styled.div`
flex-basis: 30%;
text-align: center;
position:relative;
background-color: white;
padding: 10px;
margin:10px;
border-radius: 10px;
`;

const UserContainer = styled.div`
position: sticky;
top: 20px; 
display: flex;
flex-direction: column;
align-items: center;
gap: 10px;
`;

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  return (
    <UserWrap>
      {user ? (
        <UserContainer>
          <div>{`Selected user: ${user.id}`}</div>
          <p className="subtitle is-3">{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <button
            type="button"
            className="button is-dark"
            onClick={() => dispatch(clearUser())}
          >
            Clear
          </button>
        </UserContainer>
      ) : (
        <p>No user selected</p>
      )}
    </UserWrap>
  );
};

export default User;
