type Props = {
  text: string;
};

export const ErrorNote: React.FC<Props> = ({ text }) => {
  return (
    <p className="notification is-warning">
      {text}
    </p>
  );
};
