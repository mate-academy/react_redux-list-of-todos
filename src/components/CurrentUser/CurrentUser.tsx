import React, { useEffect } from "react";
import "./CurrentUser.scss";
import { useSelector, useDispatch } from "react-redux";
import { getUserId, getUser, getErrors, getUserLoading } from "../../store";
import { User } from "../../Interfaces";
import { fetchUser, clear } from "../../store/actions";

export const CurrentUser = () => {
  const activeUserId = useSelector(getUserId);
  const user = useSelector(getUser);
  const errors = useSelector(getErrors);
  const loading = useSelector(getUserLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(activeUserId));
    // eslint-disable-next-line
  }, [activeUserId]);

  const renderUser = (user: User) => {
    return errors.user ? (
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
        <button
          type="button"
          className="clear-btn"
          onClick={() => dispatch(clear())}
        >
          Clear
        </button>
      </>
    );
  };

  return (
    <div className="CurrentUser">
      {!loading && user ? (
        renderUser(user)
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};
