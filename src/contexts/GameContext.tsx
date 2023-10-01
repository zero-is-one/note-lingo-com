import { useState, createContext } from "react";
import { Flashcard } from "@/types";
import { arrayMove } from "@/utils/array";

export type GameContextType = {
  activeCard: Flashcard;
  totalPoints: number;
  streakPoints: number;
  cardPoints: number;
  onCorrectGuess: () => void;
  onIncorrectGuess: () => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

type ListItem = {
  points: number;
  flashcard: Flashcard;
};

export const GameContextProvider: React.FC<{
  deck: Flashcard[];
  children: React.ReactNode;
}> = ({ children, deck }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [streakPoints, setStreakPoints] = useState(0);
  const [list, setList] = useState<ListItem[]>(
    deck.map((card) => ({
      points: 0,
      flashcard: card,
    }))
  );

  const onIncorrectGuess = () => {
    setStreakPoints(0);
    setList((list) => {
      const currentNote = list[0].flashcard.note;
      const lowestPossibleIndex =
        list.slice(1).findIndex((card) => card.flashcard.note !== currentNote) +
        1;

      const newList = [...list];
      newList[0] = { ...newList[0], points: 0 };
      return arrayMove(newList, 0, lowestPossibleIndex);
    });
  };

  const onCorrectGuess = () => {
    setTotalPoints((totalPoints) => totalPoints + 1);
    setStreakPoints((streakPoints) => streakPoints + 1);

    setList((list) => {
      const newList = [...list];
      newList[0] = { ...newList[0], points: newList[0].points + 1 };
      const jitter = Math.floor(Math.random() * 3);
      let desiredList = arrayMove(newList, 0, newList[0].points + jitter);

      // if the desired list first card note is the same as the current card note
      // then find a new card to put in the first position
      if (desiredList[0].flashcard.note === list[0].flashcard.note) {
        const nextCardIndex = desiredList.findIndex(
          (card) => card.flashcard.note !== list[0].flashcard.note
        );

        desiredList = arrayMove(desiredList, nextCardIndex, 0);
      }

      return desiredList;
    });
  };

  return (
    <GameContext.Provider
      value={{
        activeCard: list[0].flashcard,
        cardPoints: list[0].points,
        onCorrectGuess,
        onIncorrectGuess,
        totalPoints,
        streakPoints,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
