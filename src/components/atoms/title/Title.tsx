/* --------------------------------- Styles --------------------------------- */
import "./Title.scss";

/* -------------------------------------------------------------------------- */
/*                                    Title                                   */
/* -------------------------------------------------------------------------- */
const Title = ({ title = "", subtitle = "" }) => {
  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="title-container">
      <h1 className="title">{title}</h1>
      <p className="subtitle">{subtitle}</p>
    </div>
  );
};

export default Title;
