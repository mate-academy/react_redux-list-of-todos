import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { isLoading, finishLoading, fetchTodos } from "../store";

type Props = {
  title: string;
  message: string;
};

export const Finish: React.FC<Props> = ({ title, message }) => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);

  const handleClick = () => {
    dispatch(fetchTodos());
    dispatch(finishLoading(message));
  };

  return (
    <button type="button" onClick={handleClick} disabled={!loading}>
      {title}
    </button>
  );
};
