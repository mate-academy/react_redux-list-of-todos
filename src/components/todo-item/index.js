import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { todoDelete } from '../../actions/action-creaters';

const mapDispatchToProps = {
  todoDelete,
};

export default connect(null, mapDispatchToProps)(TodoItem);
