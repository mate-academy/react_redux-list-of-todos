// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import {DecrementCreator, IncrementCreator, setValue} from "./store/store";
import {Dispatch} from "redux";
import {AppActions} from "./actions/actions";

const App = (props: any) => {

  const handleIncrement = () => {

    props.increment()
  };

  const handleDecrement = () => {
    // props.dispatch({
    //     type: 'DECREMENT'
    // })
    props.decrement()
  };

  const handleSetValue = () => {
    props.setValue(30)
  };

  return (
      <div className="App">
        <h1>Increment & Decrement APP!</h1>
        <p>Current Value is {props.currentValue}</p>

        <div>
          <button type="button" onClick={handleIncrement}>INCREMENT</button>
          <button type="button" onClick={handleSetValue}>SetValue</button>
          <button type="button" onClick={handleDecrement}>DECREMENT</button>
        </div>
      </div>
  );
}

function mapStateToProps(state: InitialState) {
  return {
    currentValue: state.currentValue
  };
}


const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => {
  return {
    increment: () => dispatch(IncrementCreator()), // Тут мы вызываем action creator
    decrement: () => dispatch(DecrementCreator()), // Тут мы диспатчим сам action
    setValue: (value: number) => dispatch(setValue(value)), // Тут мы диспатчим сам action
    dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
