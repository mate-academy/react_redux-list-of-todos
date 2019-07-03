import { connect } from "react-redux";
import { dataLoaded, dataRequested } from '../redux/action';
import Main from "./Main";

function mapStateToProps(state) {
  return {
    todosWithUser: state.todosWithUser,
    isRequested: state.dataRequested
  };
}

function mapDispatchToProps(dispatch) {
  return {
    request: () => dispatch(dataRequested()),
    loaded: () => dispatch(dataLoaded())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);