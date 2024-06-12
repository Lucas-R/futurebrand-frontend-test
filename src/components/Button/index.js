import "./style.css";

export const Button = ({ children, disabled, onClick }) => {
  return (
    <button onClick={onClick} className="my-button" disabled={disabled}>
      {children}
    </button>
  );
};
