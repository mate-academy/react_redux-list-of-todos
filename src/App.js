import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadTodos } from './store';
import TodoList from './api/components/todoList';

class App extends React.Component {
   loadData = async() => {
     await this.props.loadingData();
   };

   render() {
     const { todos, isLoading } = this.props;

     return (
       isLoading
         ? (
           <section>
             <h1>Dynamic list of todos</h1>
             <div className="App">
               <table>
                 <thead>
                   <tr>
                     <th className="click">
                       Id
                     </th>
                     <th className="click">
                       Title
                     </th>
                     <th className="click">
                       Status
                     </th>
                     <th className="click">
                       User Name
                     </th>
                     <th className="click">
                       User Email
                     </th>
                   </tr>
                 </thead>
                 <tbody>
                   <TodoList todos={todos} />
                 </tbody>
               </table>
             </div>
           </section>
         ) : (
           <>
             <button
               type="button"
               onClick={this.loadData}
             >
               Load todos
             </button>
           </>
         )
     );
   }
}

const mapStateToProps = state => ({
  todos: state.todos,
  isLoading: state.isLoading,
  hasError: state.hasError,
});

const mapDispatchToProps = dispatch => ({
  loadingData: () => dispatch(loadTodos()),
});

App.propTypes = {
  loadingData: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
