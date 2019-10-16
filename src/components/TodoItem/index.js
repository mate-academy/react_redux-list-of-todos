import { connect } from 'react-redux';
import { handleRemove } from '../../store/actions';
import TodoItem from './TodoItem';

const mapDispatchToProps = dispatch => ({
  handleRemove: id => dispatch(handleRemove(id)),
});

const TodoItemWrap = connect(null, mapDispatchToProps)(TodoItem);

export {
  TodoItemWrap as TodoItem,// eslint-disable-line
};
