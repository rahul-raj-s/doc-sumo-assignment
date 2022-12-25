export const Button = ({
  onClick,
  children,
  variant = "primary",
  type = "",
}) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
