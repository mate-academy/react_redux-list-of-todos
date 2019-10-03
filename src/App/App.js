import React from 'react';
import TodoList from '../components/TodoList/TodoList';
import './App.css';

class App extends React.PureComponent {
  render() {
    console.log(this.props.isLoading);
    if (this.props.isLoading) {
      return (
        <div className="app">
          <p>Loading ...</p>
        </div>
      );
    }

    if (this.props.data.length === 0) {
      return (
        <div className="start">
          <button className="start-button" type="button" onClick={this.props.getData}>Show</button>
        </div>
      );
    }

    return (
      <div className="app">
        <h1>Dynamic list of todos</h1>
        <button className="button-sort" type="button" onClick={this.props.sortData}>Task </button>
        <button className="button-sort" type="button" onClick={this.props.completeData}>Complete </button>
        <TodoList
          dataFromServer={this.props.data}
        />
      </div>
    );
  }
}

export default App;
