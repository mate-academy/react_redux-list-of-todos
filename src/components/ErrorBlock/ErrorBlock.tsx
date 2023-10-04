const emptyTextLabel = '';

interface Props {
  errorMessage: string;
}

export const ErrorBlock: React.FC<Props> = ({ errorMessage }) => {
  return (
    <div className="notification is-danger">
      <button
        type="button"
        className="delete"
        onClick={() => {}}
      >
        {emptyTextLabel}
      </button>
      {errorMessage}
    </div>
  );
};
