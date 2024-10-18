/* ---------------------------------- Style --------------------------------- */
import "./Stat.scss";

/* -------------------------------------------------------------------------- */
/*                                    Stat                                    */
/* -------------------------------------------------------------------------- */
const Stat = ({
  statName,
  statValue,
}: {
  statName: string;
  statValue: number | string;
}) => {
  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="stat-container">
      <p className="stat-name">{statName}</p>
      <p className="stat-value">{statValue}</p>
    </div>
  );
};

export default Stat;
