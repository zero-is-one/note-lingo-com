import { useState } from "react";
import { Flashcard, Deck } from "@/types";
import { arrayMove, arrayChunk, arrayShuffle } from "@/utils/array";

type ListItem = {
  points: number;
  flashcard: Flashcard;
};

export type Genre = "sound" | "name" | "notation";

export const useGameState = (deck: Deck) => {
  const [genre, setGenre] = useState<Genre>("name");
  const [totalPoints, setTotalPoints] = useState(0);
  const [streakPoints, setStreakPoints] = useState(0);

  const [list, setList] = useState<ListItem[]>(() => {
    const shuffledFlashcards = arrayChunk(deck.flashcards, 6)
      .map(arrayShuffle)
      .flat();
    return shuffledFlashcards.map((card) => ({
      points: 0,
      flashcard: card,
    }));
  });

  const onIncorrectGuess = () => {
    setStreakPoints(0);
    setList((list) => {
      const currentNote = list[0].flashcard.note;
      const lowestPossibleIndex =
        list.slice(1).findIndex((card) => card.flashcard.note !== currentNote) +
        1;

      const newList = [...list];
      newList[0] = { ...newList[0], points: 0 };
      return makeNextCardDifferentNote(
        arrayMove(newList, 0, lowestPossibleIndex),
        list[0].flashcard.note
      );
    });
  };

  const onCorrectGuess = () => {
    setTotalPoints((totalPoints) => totalPoints + 1);
    setStreakPoints((streakPoints) => streakPoints + 1);

    setList((list) => {
      const newList = [...list];
      newList[0] = { ...newList[0], points: newList[0].points + 1 };

      const pointsPositionsMap = [
        3, 3, 5, 7, 14, 24, 48, 72, 96, 120, 144, 200, 300, 400, 500, 600, 700,
        800, 900, 1000,
      ];

      const randomJitter = Math.floor(Math.random() * 2);

      const desiredList = arrayMove(
        newList,
        0,
        pointsPositionsMap[newList[0].points] + randomJitter ||
          newList.length - 1
      );

      return makeNextCardDifferentNote(desiredList, list[0].flashcard.note);
    });
  };

  // if the desired list first card note is the same as the current card note
  // then find a new card to put in the first position
  const makeNextCardDifferentNote = (list: ListItem[], note: string) => {
    list = [...list];

    if (note === list[0].flashcard.note) {
      const nextCardIndex = list.findIndex(
        (listItem) => listItem.flashcard.note !== note
      );

      return arrayMove(list, nextCardIndex, 0);
    }

    return list;
  };

  return {
    genre,
    setGenre,
    activeCard: list[0].flashcard,
    cardPoints: list[0].points,
    onCorrectGuess,
    onIncorrectGuess,
    totalPoints,
    streakPoints,
  };
};
