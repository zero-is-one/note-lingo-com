import { useState, createContext } from "react";
import { Flashcard } from "@/types";
import { concertinaDeck } from "@/config/decks/concertina";

export type GameContextType = {
  activeCard: Flashcard;
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
  children: React.ReactNode;
}> = ({ children }) => {
  const [list, setList] = useState<ListItem[]>(
    concertinaDeck.cards.map((card) => ({
      points: 0,
      flashcard: card,
    }))
  );

  console.log(
    list
      .map((l) => `${l.flashcard.id} - ${l.points}`)
      .slice(0, 10)
      .join("\n")
  );

  const onIncorrectGuess = () => {
    setList((list) => {
      const newList = [...list];
      newList[0] = { ...newList[0], points: 0 };
      return arrayMove(newList, 0, 1);
    });
  };

  const onCorrectGuess = () => {
    setList((list) => {
      const newList = [...list];
      newList[0] = { ...newList[0], points: newList[0].points + 1 };
      return arrayMove(newList, 0, newList[0].points);
    });
  };

  return (
    <GameContext.Provider
      value={{
        activeCard: list[0].flashcard,
        onCorrectGuess,
        onIncorrectGuess,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

function arrayMove<T>(arr: T[], fromIndex: number, toIndex: number) {
  const newArr = [...arr];
  newArr.splice(toIndex, 0, newArr.splice(fromIndex, 1)[0]);
  return newArr;
}
