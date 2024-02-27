type Props = {
  message: string;
};

export const Notification: React.FC<Props> = ({ message }) => {
  return (
    <div className="notification is-danger">
      <button
        className="delete"
        type="button"
        aria-label="close notification"
      />
      {message}
    </div>
  );
};
