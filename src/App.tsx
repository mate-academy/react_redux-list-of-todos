import React from "react";
import { useSelector } from "react-redux";

import "./App.scss";
import { getUserId } from "./store";
import { TodoList } from "./components/TodoList/TodoList";
import { CurrentUser } from "./components/CurrentUser/CurrentUser";

const App = () => {
  const userId = useSelector(getUserId);

  return (
    <div className="App">
      <div className="App__sidebar">
        <TodoList />
      </div>

      <div className="App__content">
        <div className="App__content-container">
          {userId ? <CurrentUser /> : "User not selected"}
        </div>
      </div>
    </div>
  );
};

export default App;
