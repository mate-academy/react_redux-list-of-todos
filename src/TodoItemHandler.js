import { connect } from 'react-redux';
import TodoItem from './TodoItem';
import { handleRemove } from './store';

export default connect(null, { handleRemove })(TodoItem);
