import { connect } from 'react-redux';
import { removeTheItem } from '../redux/actions';
import TodoItem from './TodoItem';

function mapStateToProps(state, myProps) {
    return {
        title: myProps.todo.title,
        user: myProps.todo.name,
        email: myProps.todo.email,
        completed: myProps.todo.completed,
        index: myProps.index
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeTheItem: (index) => dispatch(removeTheItem(index))
    }
}

const TodoItemHandler = connect(mapStateToProps, mapDispatchToProps)(TodoItem);
export default TodoItemHandler;
