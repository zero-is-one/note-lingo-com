import { BellowState, Flashcard } from "@/types";
import { concertinaLayout } from "../layouts/concertina";
import { arrayMove } from "@/utils/array";

const buttonOrder: Array<[number, BellowState]> = [
  //Home button order
  [12, "push"],
  [14, "pull"],
  [15, "pull"],
  [12, "pull"],
  [13, "push"],
  [14, "push"],
  [15, "push"],
  [11, "pull"],
  [13, "pull"],
  [11, "push"],
  [16, "pull"],
  [17, "pull"],
  [18, "pull"],
  [16, "push"],
  [17, "push"],
  [18, "push"],

  // Wing button order
  [4, "pull"],
  [3, "pull"],
  [2, "pull"],
  [1, "pull"],
  [4, "push"],
  [3, "push"],
  [2, "push"],
  [1, "push"],

  [5, "pull"],
  [6, "pull"],
  [7, "pull"],
  [8, "pull"],
  [5, "push"],
  [6, "push"],
  [7, "push"],
  [8, "push"],

  [21, "pull"],
  [22, "pull"],
  [23, "pull"],
  [24, "pull"],
  [21, "push"],
  [22, "push"],
  [23, "push"],
  [24, "push"],

  [25, "pull"],
  [26, "pull"],
  [27, "pull"],
  [28, "pull"],
  [25, "push"],
  [26, "push"],
  [27, "push"],
  [28, "push"],

  //Tip Buttons
  [0, "pull"],
  [10, "pull"],
  [20, "pull"],
  [0, "push"],
  [10, "push"],
  [20, "push"],

  [9, "pull"],
  [19, "pull"],
  [29, "pull"],
  [9, "push"],
  [19, "push"],
  [29, "push"],
];

let cards: Flashcard[] = [];

buttonOrder.forEach(([buttonIndex, bellowState]) => {
  const cardProtype = {
    buttonIndex,
    bellowState,
    note: concertinaLayout[buttonIndex][bellowState],
  };

  cards.push({
    ...cardProtype,
    genre: "name",
    id: `${buttonIndex}-${cardProtype.note}-${bellowState}-name`,
  });
  cards.push({
    ...cardProtype,
    genre: "notation",
    id: `${buttonIndex}-${cardProtype.note}-${bellowState}-notation`,
  });
  cards.push({
    ...cardProtype,
    genre: "sound",
    id: `${buttonIndex}-${cardProtype.note}-${bellowState}-sound`,
  });
});

cards = arrayMove(cards, 3, 0);
cards = arrayMove(cards, 6, 1);

export const deck = cards;