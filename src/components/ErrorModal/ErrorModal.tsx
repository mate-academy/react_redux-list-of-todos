type Props = {
  errorText?: string;
  btnAction: () => void;
};

export const ErrorModal: React.FC<Props> = ({ errorText = '', btnAction }) => {
  return (
    <div className="notification is-danger">
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type="button"
        className="delete"
        data-cy="modal-close"
        onClick={btnAction}
      />

      <span className="modal-card-title fa-2x has-text-white">
        {`Oops! Something went wrong.
          ${errorText}`}
      </span>
    </div>
  );
};
