import { useEffect } from "react";

/* --------------------------------- Style ---------------------------------- */
import "./GameZone.scss";

/* ------------------------------- Components ------------------------------- */
import Card from "../../atoms/card";

/* ---------------------------------- Utils --------------------------------- */
import { useGameStore, useStatisticStore } from "../../../store/store";
import classNames from "classnames";

/* -------------------------------------------------------------------------- */
/*                                  Game Zone                                 */
/* -------------------------------------------------------------------------- */
const GameZone = ({
  cards,
}: {
  cards: Array<{ type: string; image: string }>;
}) => {
  const moves = useGameStore((state) => state.moves);
  const selectedLevel = useGameStore((state) => state.selectedLevel);
  const increaseMoves = useGameStore((state) => state.increaseMoves);
  const increaseAttempts = useStatisticStore((state) => state.increaseAttempts);
  const increaseRevealedCardsCounter = useGameStore(
    (state) => state.increaseRevealedCardsCounter
  );
  const increaseMatchedCardsCounter = useGameStore(
    (state) => state.increaseMatchedCardsCounter
  );
  const openCards = useGameStore((state) => state.openCards);
  const updateOpenCards = useGameStore((state) => state.updateOpenCards);
  const resetOpenCards = useGameStore((state) => state.resetOpenCards);
  const pairedCards = useGameStore((state) => state.pairedCards);
  const updatePairedCards = useGameStore((state) => state.updatePairedCards);
  const time = useGameStore((state) => state.time);
  const toggleTimer = useGameStore((state) => state.toggleTimer);
  const updateGameHistory = useStatisticStore(
    (state) => state.updateGameHistory
  );

  const handleCardClick = (index: number) => {
    if (moves === 0 && openCards.length === 0) {
      toggleTimer();
      increaseAttempts();
    }

    updateOpenCards(index);
    increaseRevealedCardsCounter();
  };

  const checkIsFlipped = (index: number) => openCards.includes(index);

  const checkIsPaired = (index: number) => pairedCards.includes(index);

  useEffect(() => {
    let timeout = 0;
    if (openCards.length === 2) {
      timeout = setTimeout(() => resetOpenCards(), 1000);
      const [firstCard, secondCard] = openCards;
      increaseMoves();
      if (cards[firstCard].type === cards[secondCard].type) {
        clearTimeout(timeout);
        updatePairedCards(firstCard, secondCard);
        increaseMatchedCardsCounter();
        resetOpenCards();
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [
    openCards,
    cards,
    resetOpenCards,
    updatePairedCards,
    increaseMoves,
    increaseMatchedCardsCounter,
  ]);

  useEffect(() => {
    if (pairedCards.length === cards.length) {
      toggleTimer();
      if (time !== 0) {
        updateGameHistory({
          time,
          date: new Date().toISOString().split("T")[0],
        });
      }
    }
  }, [pairedCards, cards, toggleTimer, updateGameHistory, time]);

  /* --------------------------------- Render --------------------------------- */
  return (
    <div
      className={classNames("game-container", {
        hard: selectedLevel === "Hard",
      })}
    >
      {cards.map(({ image }: { image: string }, index: number) => (
        <Card
          key={index}
          index={index}
          onCardClick={handleCardClick}
          image={image}
          isPaired={checkIsPaired(index)}
          isFlipped={checkIsFlipped(index)}
        />
      ))}
    </div>
  );
};

export default GameZone;
