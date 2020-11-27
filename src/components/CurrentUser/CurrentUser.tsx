import React, { useEffect } from "react";
import "./CurrentUser.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUserId, getUser } from "../../store";
import { User } from "../../Interfaces";
import { fetchUser } from "../../store/actions";

const error = false;

export const CurrentUser = () => {
  const activeUserId = useSelector(getUserId);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(activeUserId));
    // eslint-disable-next-line
  }, [activeUserId]);

  const renderUser = (user: User) => {
    return error ? (
      "Such user does not exist"
    ) : (
      <>
        <h2 className="CurrentUser__title">
          <span>
            Selected user:&nbsp;
            {activeUserId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button type="button" className="clear-btn">
          Clear
        </button>
      </>
    );
  };

  return (
    <div className="CurrentUser">
      {user ? renderUser(user) : <div className="loading">Loading...</div>}
    </div>
  );
};
