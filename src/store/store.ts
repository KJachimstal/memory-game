import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* -------------------------------------------------------------------------- */
/*                                 Game Store                                 */
/* -------------------------------------------------------------------------- */

interface Card {
  type: string;
  image: string;
}

interface GameState {
  moves: number;
  attempts: number;
  revealedCardsCounter: number;
  matchedCardsCounter: number;
  time: number;
  isTimerActive: boolean;
  selectedLevel: string;
  levels: Array<string>;
  openCards: Array<number>;
  pairedCards: Array<number>;
  gameCards: Array<{ type: string, image: string }>;
  setGameCards: (cards: Array<Card>) => void;
  resetPairedCards: () => void;
  updatePairedCards: (firstIndex: number, secondIndex: number) => void;
  resetOpenCards: () => void;
  updateOpenCards: (index: number) => void;
  increaseMoves: () => void;
  resetMoves: () => void;
  increaseRevealedCardsCounter: () => void;
  increaseMatchedCardsCounter: () => void;
  updateTime: () => void;
  resetTime: () => void;
  toggleTimer: () => void;
  updateSelectedLevel: (updatedLevel: string) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  moves: 0,
  attempts: 0,
  revealedCardsCounter: 0,
  matchedCardsCounter: 0,
  time: 0,
  isTimerActive: false,
  selectedLevel: "Easy",
  levels: ["Easy", "Normal", "Hard"],
  openCards: [],
  pairedCards: [],
  gameCards: [],
  /* ------------------------------- Game Cards ------------------------------- */
  setGameCards: (cards: Array<Card>) =>
    set({ gameCards: cards }),

  /* ------------------------------ Paired Cards ------------------------------ */
  resetPairedCards: () => set({ pairedCards: [] }),
  updatePairedCards: (firstIndex, secondIndex) =>
    set((state) => ({
      pairedCards: [...state.pairedCards, firstIndex, secondIndex],
    })),

  /* ------------------------------- Open Cards ------------------------------- */
  resetOpenCards: () => set({ openCards: [] }),
  updateOpenCards: (index) =>
    set((state) => {
      if (state.openCards.length === 1) {
        return { openCards: [...state.openCards, index] };
      } else {
        return { openCards: [index] };
      }
    }),

  /* ---------------------------------- Moves --------------------------------- */
  increaseMoves: () => set((state) => ({ moves: state.moves + 1 })),
  resetMoves: () => set({ moves: 0 }),

  /* ------------------------------- Statistics ------------------------------- */
  increaseRevealedCardsCounter: () =>
    set((state) => ({
      revealedCardsCounter: state.revealedCardsCounter + 1,
    })),
  increaseMatchedCardsCounter: () =>
    set((state) => ({
      matchedCardsCounter: state.matchedCardsCounter + 1,
    })),

  /* ---------------------------------- Time ---------------------------------- */
  updateTime: () => set((state) => ({ time: state.time + 1 })),
  resetTime: () => set({ time: 0, isTimerActive: false }),
  toggleTimer: () =>
    set((state) => ({ isTimerActive: !state.isTimerActive })),

  /* ---------------------------------- Level --------------------------------- */
  updateSelectedLevel: (updatedLevel) =>
    set({ selectedLevel: updatedLevel }),

  /* ------------------------------- Reset Game ------------------------------- */
  resetGame: () =>
    set({
      moves: 0,
      time: 0,
      isTimerActive: false,
      openCards: [],
      pairedCards: [],
      revealedCardsCounter: 0,
      matchedCardsCounter: 0,
    }),
}));

export type GameStore = ReturnType<typeof useGameStore.getState>;

/* -------------------------------------------------------------------------- */
/*                              Statisctic Store                              */
/* -------------------------------------------------------------------------- */

interface GameHistory { time: number; date: string }

interface StatisticsState {
  attempts: number;
  gameHistory: Array<GameHistory>;
  increaseAttempts: () => void;
  updateGameHistory: (newGameHistory: GameHistory) => void;
}

export const useStatisticStore = create<StatisticsState>()(
  persist(
    (set) => ({
      attempts: 0,
      gameHistory: [],

      /* -------------------------------- Attempts -------------------------------- */
      increaseAttempts: () =>
        set((state) => ({
          attempts: state.attempts + 1,
        })),

      /* --------------------------- Update game history -------------------------- */
      updateGameHistory: (newGameHistory) =>
        set((state) => ({
          gameHistory: [...state.gameHistory, newGameHistory],
        })),
    }),
    {
      name: "statistics-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
