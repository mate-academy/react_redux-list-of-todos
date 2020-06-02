import React from 'react';
import { connect, ConnectedProps} from 'react-redux';
import { RootState, isLoading } from '../store';
import { setLoading } from '../store/loading';

const mapState = (state: RootState) => {
  return {
    loading: isLoading(state), // we use a selector `isLoading` defined in the store
  };
};

const mapDispatch = {
  load: setLoading,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {
  title: string;
  init: () => void;
};

const LoadButton: React.FC<Props> = ({ init, loading, title }) => {

  return (
    <button
      className="start-btn"
      type="button"
      onClick={init}
      disabled={loading}
    >
      {title}
    </button>
  );
};

export default connector(LoadButton);
