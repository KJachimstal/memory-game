const numbersOfCards = (level: string) => {
  switch (level) {
    case "Easy":
      return 6;
    case "Normal":
      return 8;
    case "Hard":
      return 10;
    default:
      return 6;
  }
};
export const prepareGameCards = (
  cardsArray: Array<{ type: string; image: string }>,
  level: string
) => {
  const gameCards = cardsArray.slice(0, numbersOfCards(level));
  const pairedCards = gameCards.concat(gameCards);
  const arrayLength = pairedCards.length;

  for (let i = arrayLength; i > 0; i--) {
    const randomizedIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = pairedCards[currentIndex];
    pairedCards[currentIndex] = pairedCards[randomizedIndex];
    pairedCards[randomizedIndex] = temp;
  }

  return pairedCards;
};

export const formatTime = (timer: number) => {
  const hours = Math.floor(((timer / 6000) % 60) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((timer / 6000) % 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((timer / 100) % 60)
    .toString()
    .padStart(2, "0");
  const milliseconds = (timer % 100).toString().padStart(2, "0");

  return { hours, minutes, seconds, milliseconds };
};

export const countTotalGameTime = (
  gameHistory: Array<{ time: number; date: string }>
) => gameHistory.reduce((acc, game) => acc + game.time, 0);
