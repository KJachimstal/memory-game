/* ------------------------------- Components ------------------------------- */
import Stat from "../../atoms/stat";

/* ---------------------------------- Utils --------------------------------- */
import { useGameStore } from "../../../store/store";

/* --------------------------------- Style ---------------------------------- */
import "./Statistics.scss";

/* -------------------------------------------------------------------------- */
/*                                 Statistics                                 */
/* -------------------------------------------------------------------------- */
const Statistics = () => {
  const revealedCardsCounter = useGameStore(
    (state) => state.revealedCardsCounter
  );
  const matchedCardsCounter = useGameStore(
    (state) => state.matchedCardsCounter
  );
  const moves = useGameStore((state) => state.moves);

  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="statistics-container">
      <Stat statName="Revealed cards:" statValue={revealedCardsCounter} />
      <Stat statName="Mateched pairs:" statValue={matchedCardsCounter} />
      <Stat statName="Moves:" statValue={moves} />
    </div>
  );
};

export default Statistics;
