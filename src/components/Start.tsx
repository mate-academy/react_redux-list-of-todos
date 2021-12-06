import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState, isLoading, startLoading } from '../store';
// import { getTodos } from '../store/api';

/**
 * mapStateToProps - is a function receiving full Redux state as the first argument
 * and returning an object with extra props that will be added to a component
 * after calling connect(mapStateToProps, mapDispatchToProps)(MyComponent)
 *
 * @param {object} state - full Redux state
 *
 * @return {object}
 */
const mapStateToProps = (state: RootState) => {
  return {
    loading: isLoading(state), // we use a selector `isLoading` defined in the store
  };
};

/**
 * We use an object syntax for `mapDispatchToProps` where
 * `load` - is a callback name passed to the component as a prop
 * `startLoading` - is an action creator defined in the store
 */
const mapDispatchToProps = {
  load: startLoading,
};

/**
 * We split the connect(mapStateToProps, mapDispatchToProps)(MyComponent) into 2 parts
 * to be able to use `typeof connector` for `MyComponent` props
 */
const connector = connect(mapStateToProps, mapDispatchToProps);

/**
 * We use ConnectedProps<typeof connector> to get the type for all the extra
 * props received from `mapStateToProps` and `mapDispatchToProps`
 */
type Props = ConnectedProps<typeof connector> & {
  title: string; // a regular prop passed like <Start title="Start loading" />
};

const Start: React.FC<Props> = ({ load, loading, title }) => {
  useEffect(() => {
    // getTodos()
    //   .then(response => dispatch(response));
  }, []);

  return (
    <button
      type="button"
      onClick={load}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default connector(Start);
