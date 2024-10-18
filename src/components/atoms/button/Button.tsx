/* ---------------------------------- Style --------------------------------- */
import "./Button.scss";

/* ---------------------------------- Utils --------------------------------- */
import classNames from "classnames";

/* -------------------------------------------------------------------------- */
/*                                   Button                                   */
/* -------------------------------------------------------------------------- */
const Button = ({
  content,
  onClick,
  className,
}: {
  content: string;
  onClick: () => void;
  className?: string;
}) => {
  /* --------------------------------- Render --------------------------------- */
  return (
    <div
      className={classNames("button-container", className)}
      onClick={onClick}
    >
      <p className="button-content">{content}</p>
    </div>
  );
};

export default Button;
