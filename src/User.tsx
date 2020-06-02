import React from 'react';

type Props = {
  user: UserProps;
};

const User: React.FC<Props> = ({ user }) => {
  return (
    <div className="names">
      <p className="article">
        Name:
        {user.name}
      </p>
    </div>
  );
};

export default User;
