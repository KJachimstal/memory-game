import { useEffect } from "react";

/* ------------------------------- Components ------------------------------- */
import GameZone from "../../molecules/game-zone";
import Title from "../../atoms/title";
import Timer from "../../atoms/timer";
import Button from "../../atoms/button";
import LevelSwitch from "../../atoms/level-switch";
import GameHistory from "../../molecules/game-history";
import Statistics from "../../molecules/statistics";

/* --------------------------------- Images --------------------------------- */
import css from "../../../assets/images/css.png";
import html from "../../../assets/images/html.png";
import js from "../../../assets/images/js.png";
import node from "../../../assets/images/node.png";
import react from "../../../assets/images/react.png";
import ts from "../../../assets/images/ts.png";
import vite from "../../../assets/images/vite.png";
import vscode from "../../../assets/images/vscode.png";
import ruby from "../../../assets/images/ruby.png";
import gitlab from "../../../assets/images/gitlab.png";

/* ---------------------------------- Utils --------------------------------- */
import { prepareGameCards } from "../../../utils/functions";
import { useGameStore, useStatisticStore } from "../../../store/store";

/* --------------------------------- Style ---------------------------------- */
import "./GamePage.scss";

/* -------------------------------- Constants ------------------------------- */
const cards = [
  {
    type: "css",
    image: css,
  },
  {
    type: "html",
    image: html,
  },
  {
    type: "js",
    image: js,
  },
  {
    type: "node",
    image: node,
  },
  {
    type: "react",
    image: react,
  },
  {
    type: "ts",
    image: ts,
  },
  {
    type: "vite",
    image: vite,
  },
  {
    type: "vscode",
    image: vscode,
  },
  {
    type: "ruby",
    image: ruby,
  },
  {
    type: "gitlab",
    image: gitlab,
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Game Page                                 */
/* -------------------------------------------------------------------------- */
const GamePage = () => {
  const resetGame = useGameStore((state) => state.resetGame);
  const selectedLevel = useGameStore((state) => state.selectedLevel);
  const gameCards = useGameStore((state) => state.gameCards);
  const setGameCards = useGameStore((state) => state.setGameCards);
  const updateGameHistory = useStatisticStore(
    (state) => state.updateGameHistory
  );
  const time = useGameStore((state) => state.time);

  const handleRestart = () => {
    setGameCards(prepareGameCards(cards, selectedLevel));
    updateGameHistory({
      time,
      date: new Date().toISOString().split("T")[0],
    });
    resetGame();
  };

  useEffect(() => {
    setGameCards(prepareGameCards(cards, selectedLevel));
    resetGame();
  }, [selectedLevel, resetGame, setGameCards]);

  /* --------------------------------- Render --------------------------------- */
  return (
    <div className="game-page-container">
      <Title title="Memory Game" subtitle="Flip card to start a game" />
      <LevelSwitch />
      <Timer />
      <Statistics />
      <GameZone cards={gameCards} />
      <Button onClick={handleRestart} content="Play again" />
      <GameHistory />
    </div>
  );
};

export default GamePage;
