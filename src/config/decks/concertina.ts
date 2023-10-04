import { InstrumentButtonAction, Flashcard } from "@/types";
import { angloConcertinaCgWheatstoneInstrument as concertina } from "@/config/instruments/angloConcertinaCgWheatstone";

const buttonOrder: Array<[number, InstrumentButtonAction]> = [
  //Home button order
  [12, "pushBellowsButtonPress"],
  [14, "pullBellowsButtonPress"],
  [15, "pullBellowsButtonPress"],
  [12, "pullBellowsButtonPress"],
  [13, "pushBellowsButtonPress"],
  [14, "pushBellowsButtonPress"],
  [15, "pushBellowsButtonPress"],
  [11, "pullBellowsButtonPress"],
  [18, "pushBellowsButtonPress"],
  [13, "pullBellowsButtonPress"],
  [11, "pushBellowsButtonPress"],
  [16, "pullBellowsButtonPress"],
  [16, "pushBellowsButtonPress"],
  [17, "pullBellowsButtonPress"],
  [18, "pullBellowsButtonPress"],
  [17, "pushBellowsButtonPress"],

  // Wing button order
  [4, "pullBellowsButtonPress"],
  [27, "pullBellowsButtonPress"],
  [21, "pullBellowsButtonPress"],
  [8, "pullBellowsButtonPress"],
  [5, "pushBellowsButtonPress"],
  [27, "pushBellowsButtonPress"],
  [25, "pullBellowsButtonPress"],
  [1, "pullBellowsButtonPress"],
  [26, "pushBellowsButtonPress"],

  [2, "pushBellowsButtonPress"],
  [3, "pullBellowsButtonPress"],
  [2, "pullBellowsButtonPress"],
  [21, "pushBellowsButtonPress"],
  [4, "pushBellowsButtonPress"],
  [3, "pushBellowsButtonPress"],
  [25, "pushBellowsButtonPress"],
  [1, "pushBellowsButtonPress"],

  [7, "pullBellowsButtonPress"],
  [23, "pushBellowsButtonPress"],
  [6, "pushBellowsButtonPress"],
  [24, "pullBellowsButtonPress"],
  [22, "pushBellowsButtonPress"],
  [7, "pushBellowsButtonPress"],
  [8, "pushBellowsButtonPress"],
  [22, "pullBellowsButtonPress"],
  [23, "pullBellowsButtonPress"],
  [24, "pushBellowsButtonPress"],

  [26, "pullBellowsButtonPress"],
  [5, "pullBellowsButtonPress"],
  [6, "pullBellowsButtonPress"],
  [28, "pullBellowsButtonPress"],

  [28, "pushBellowsButtonPress"],

  //Tip Buttons
  [0, "pullBellowsButtonPress"],
  [29, "pullBellowsButtonPress"],
  [10, "pushBellowsButtonPress"],
  [19, "pullBellowsButtonPress"],
  [10, "pullBellowsButtonPress"],
  [20, "pullBellowsButtonPress"],
  [0, "pushBellowsButtonPress"],
  [19, "pushBellowsButtonPress"],
  [20, "pushBellowsButtonPress"],
  [9, "pullBellowsButtonPress"],
  [9, "pushBellowsButtonPress"],
  [29, "pushBellowsButtonPress"],
];

const cards: Flashcard[] = [];

buttonOrder.forEach(([buttonIndex, action]) => {
  const note = concertina.buttons[buttonIndex].behaviors.find(
    (behavior) => behavior.action === action
  )?.note as string;

  const cardProtype = {
    buttonIndex,
    action,
    note,
  };

  cards.push({
    ...cardProtype,
    genre: "name",
    id: `${buttonIndex}-${cardProtype.note}-${action}-name`,
  });
  cards.push({
    ...cardProtype,
    genre: "notation",
    id: `${buttonIndex}-${cardProtype.note}-${action}-notation`,
  });
  cards.push({
    ...cardProtype,
    genre: "sound",
    id: `${buttonIndex}-${cardProtype.note}-${action}-sound`,
  });
});

export const deck = cards;
