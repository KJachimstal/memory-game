/* ---------------------------------- Utils --------------------------------- */
import classNames from "classnames";
import { useGameStore } from "../../../store/store";

/* ---------------------------------- Style --------------------------------- */
import "./LevelSwitch.scss";

/* ------------------------------- Components ------------------------------- */
import Button from "../button";

/* -------------------------------------------------------------------------- */
/*                                Level Switch                                */
/* -------------------------------------------------------------------------- */
const LevelSwitch = () => {
  const levels = useGameStore((state) => state.levels);
  const selectedLevel = useGameStore((state) => state.selectedLevel);
  const updateSelectedLevel = useGameStore(
    (state) => state.updateSelectedLevel
  );

  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="switch-container">
      <ul className="switch-list">
        {levels.map((level: string) => (
          <Button
            key={level}
            content={level}
            className={classNames({
              selected: level === selectedLevel,
            })}
            onClick={() => updateSelectedLevel(level)}
          />
        ))}
      </ul>
    </div>
  );
};

export default LevelSwitch;
