import { useState, createContext } from "react";
import { Flashcard } from "@/types";
import { concertinaDeck } from "@/config/decks/concertina";
import { List } from "immutable";

export type GameContextType = {
  points: number;
  activeCard: Flashcard;
  addPoint: () => void;
  subtractPoint: () => void;
  getNewActiveCard: () => void;
};

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

type Card = {
  points: number;
  flashcard: Flashcard;
};

const list = List(
  concertinaDeck.cards.map((card) => ({
    points: 0,
    flashcard: card,
  }))
);

console.log(list);

export const GameContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [points, setPoints] = useState(40);
  const [activeCard, setActiveCard] = useState<Flashcard>(
    concertinaDeck.cards[0]
  );

  const pointDivisor = 10;
  const nominatedCardsCount = Math.max(Math.round(points / pointDivisor), 2);
  const nominatedCards = concertinaDeck.cards.slice(0, nominatedCardsCount);

  const getNewActiveCard = () => {
    const filteredNominatedCard = nominatedCards.filter(
      (card) => card.note !== activeCard.note
    );
    const randomIndex = Math.floor(
      Math.random() * filteredNominatedCard.length
    );
    const newActiveCard = filteredNominatedCard[randomIndex];

    setActiveCard(newActiveCard);
  };

  const subtractPoint = () => {
    setPoints((p) => Math.max(p - 1, 0));
  };

  const addPoint = () => {
    setPoints((p) => p + 1);
  };

  return (
    <GameContext.Provider
      value={{
        points,
        activeCard,
        addPoint,
        subtractPoint,
        getNewActiveCard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
