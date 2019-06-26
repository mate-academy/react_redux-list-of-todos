import { connect } from 'react-redux';
import Toggle from './Toggle';
import { todoComplete } from '../../actions/action-creaters';

const mapDispatchToProps = {
  todoComplete,
};

export default connect(null, mapDispatchToProps)(Toggle);
