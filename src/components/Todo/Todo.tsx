import { connect } from 'react-redux';
import { deleteTodo } from '../../store/actionCreators';
import { TodoTemplate } from './TodoTemplate';


const mapDispatch = {
  deleteTodo,
};

export const Todo = connect(null, mapDispatch)(TodoTemplate);
