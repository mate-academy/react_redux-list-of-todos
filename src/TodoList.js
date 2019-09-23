import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
// import { filterTodo } from './store';
import TodoItem from './TodoItem';

const TodoList = ({
  todos,
}) => (
  <table className="App">
    <thead>
      <tr>
        <FormControl variant="filled"
        // className={classes.formControl}
        >
          <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
          <Select
            // value={values.age}
            // onChange={filterTodo(todos, values.age)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="id">id</MenuItem>
            <MenuItem value="completed">completed</MenuItem>
            <MenuItem value="title">title</MenuItem>
            <MenuItem value="user">user</MenuItem>
          </Select>
        </FormControl>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>
  </table>
);

// TodoList.propTypes = {
//   todos: PropTypes.shape().isRequired,
// };

const mapDispatchToProps = dispatch => ({
  // filterTodo: (value, act) => dispatch(filterTodo(value, act)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TodoList);
