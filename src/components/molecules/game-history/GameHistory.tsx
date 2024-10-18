/* ------------------------------- Components ------------------------------- */
import Stat from "../../atoms/stat";

/* ---------------------------------- Style --------------------------------- */
import "./GameHistory.scss";

/* ---------------------------------- Utils --------------------------------- */
import { useStatisticStore } from "../../../store/store";
import { countTotalGameTime, formatTime } from "../../../utils/functions";

/* -------------------------------------------------------------------------- */
/*                                Game History                                */
/* -------------------------------------------------------------------------- */
const GameHistory = () => {
  const attempts = useStatisticStore((state) => state.attempts);
  const gameHistory = useStatisticStore((state) => state.gameHistory);
  const { hours, minutes, seconds, milliseconds } = formatTime(
    countTotalGameTime(gameHistory)
  );
  const lastPlayedGame =
    gameHistory.length > 0 ? gameHistory[gameHistory.length - 1].date : "-";

  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="history-container">
      <p className="history-title">Game history</p>
      <Stat
        statName="Total game time:"
        statValue={`${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`}
      />
      <Stat statName="Attempts:" statValue={attempts} />
      <Stat statName="Last played:" statValue={lastPlayedGame} />
    </div>
  );
};

export default GameHistory;
