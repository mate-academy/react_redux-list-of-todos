import React from "react";
import "./App.css";
import "../TodoItem/TodoItem";

import TodoList from "../TodoList/TodoList";

const App = ({
 loadData, isLoading, isLoaded, todos,
}) => (
  <div className="app">
    {isLoading && (
      <div className="ui segment">
        <div className="ui active inverted dimmer">
          <div className="ui large text loader">Loading</div>
        </div>
      </div>
    )}
    {!todos.length && !isLoading && (
      <button onClick={loadData} className="positive ui button">
        Click
      </button>
    )}
    {isLoaded && (
      <>
        <h1>
          <span className="ui red header">Static</span>{" "}
          <span className="ui green header">list</span>{" "}
          <span className="ui yellow header">of</span>{" "}
          <span className="ui blue header">todos</span>
        </h1>
        <div className="ui statistics">
          <div className="teal statistic">
            <div className="value">{todos.length}</div>
            <div className="label">TODOs</div>
          </div>
        </div>
        <TodoList todos={todos} />
      </>
    )}
  </div>
);

export default App;
