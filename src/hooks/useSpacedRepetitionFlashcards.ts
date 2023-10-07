import { useState } from "react";
import { Flashcard } from "@/types";
import { arrayMove } from "@/utils/array";

type PromotionalChit = {
  flashcard: Flashcard;
  points: number;
};

const promotionTeirs = [
  3, 3, 5, 7, 14, 24, 48, 72, 96, 120, 144, 200, 300, 400, 500, 600, 700, 800,
  900, 1000,
];

export const useSpacedRepetitionFlashcards = (
  initialFlashcards: Flashcard[]
) => {
  const [chits, setChits] = useState<PromotionalChit[]>(
    initialFlashcards.map((flashcard) => ({ flashcard, points: 0 }))
  );

  const promote = (flashcard: Flashcard) => {
    // increment chit points
    // move towards back of list
    setChits((chits) => {
      const newChits = [...chits];
      const index = newChits.findIndex(
        (chit) => chit.flashcard.note === flashcard.note
      );
      newChits[index] = {
        ...newChits[index],
        points: newChits[index].points + 1,
      };
      const randomJitter = Math.floor(Math.random() * 3);
      const newIndex = Math.min(
        promotionTeirs[newChits[index].points] + randomJitter,
        chits.length - 1
      );
      return arrayMove(newChits, index, newIndex);
    });
  };

  const reset = (flashcard: Flashcard) => {
    // set chit points to 0
    // move towards front of list
    setChits((chits) => {
      const newChits = [...chits];
      const index = newChits.findIndex(
        (chit) => chit.flashcard.note === flashcard.note
      );
      newChits[index] = { ...newChits[index], points: 0 };
      const randomJitter = Math.floor(Math.random() * 3);
      return arrayMove(newChits, index, 1 + randomJitter);
    });
  };

  return {
    chits,
    flashcards: chits.map((chit) => chit.flashcard),
    reset,
    promote,
  };
};
