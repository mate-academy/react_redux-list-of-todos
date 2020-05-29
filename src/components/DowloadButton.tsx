import React from 'react';

interface Props {
  loadData: () => void;
}

export const DowloadButton: React.FC<Props> = ({ loadData }) => {
  return (
    <button
      type="button"
      className="get-info"
      onClick={loadData}
    >
      Loading
    </button>
  );
};
