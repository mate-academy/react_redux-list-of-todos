import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTodos from './api/todosApi';
import getUsers from './api/usersApi';
import {
  startLoading,
  handleSuccess,
  handleDelete,
} from './store';
import TodoList from './api/components/todoList';

class App extends React.Component {
   loadData = async() => {
     const { startLoad, handleOk } = this.props;

     startLoad();

     const [
       todosFromServer,
       usersFromServer,
     ] = await Promise.all([
       getTodos(),
       getUsers(),
     ]);

     handleOk(todosFromServer.map(todo => (
       {
         ...todo,
         user: usersFromServer.find(person => person.id === todo.userId),
       })));
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
  startLoad: () => dispatch(startLoading()),
  handleOk: todos => dispatch(handleSuccess(todos)),
  handleDeleteTodo: peyload => dispatch(handleDelete(peyload)),
});

App.propTypes = {
  startLoad: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
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
