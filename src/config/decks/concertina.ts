import { InstrumentButtonAction, Flashcard } from "@/types";
import { angloConcertinaCgWheatstoneInstrument as concertina } from "@/config/instruments/angloConcertinaCgWheatstone";
import { Note } from "tonal";

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

const concertinaButtonIndexBehaviorMap = concertina.buttons
  .map((button, index) =>
    button.behaviors.map((behavior) => ({ index, behavior }))
  )
  .flat();

const concertinaAllNotes = concertina.buttons
  .map((button) => {
    return button.behaviors.map((behavior) => behavior.note);
  })
  .flat()
  .map((note) => [
    Note.fromMidi(Note.midi(note)!),
    Note.fromMidiSharps(Note.midi(note)!),
  ])
  .flat()
  .filter((note, index, self) => self.indexOf(note) === index) //remove duplicates
  .sort((a, b) => {
    const noteFrom = "F4";
    const aDistance = Math.abs(Note.midi(noteFrom)! - Note.midi(a)!);
    const bDistance = Math.abs(Note.midi(noteFrom)! - Note.midi(b)!);
    return aDistance - bDistance;
  })
  // map behavior to button index map
  .map((note) =>
    concertinaButtonIndexBehaviorMap
      .filter((mapItem) => Note.midi(mapItem.behavior.note) === Note.midi(note))
      .map((mapItem) => ({ label: note, ...mapItem }))
  )
  .flat();

// prettier-ignore
const items = [
  {note:"F4",buttonIndex:13,action:"pullBellowsButtonPress"},
  {note:"E4",buttonIndex:13,action:"pushBellowsButtonPress"},
  {note:"Gb4",buttonIndex:21,action:"pullBellowsButtonPress"},
  {note:"F#4",buttonIndex:21,action:"pullBellowsButtonPress"},
  {note:"Eb4",buttonIndex:2,action:"pullBellowsButtonPress"},
  {note:"D#4",buttonIndex:2,action:"pullBellowsButtonPress"},
  {note:"G4",buttonIndex:3, action:"pullBellowsButtonPress"},
  {note:"G4",buttonIndex:14,action:"pushBellowsButtonPress"},
  {note:"G4",buttonIndex:22,action:"pushBellowsButtonPress"},
  {note:"Ab4",buttonIndex:4,action:"pushBellowsButtonPress"},
  {note:"G#4",buttonIndex:4,action:"pushBellowsButtonPress"},
  {note:"D4",buttonIndex:12,action:"pullBellowsButtonPress"},
  {note:"D4",buttonIndex:21,action:"pushBellowsButtonPress"},
  {note:"Db4",buttonIndex:2,action:"pushBellowsButtonPress"},
  {note:"C#4",buttonIndex:2,action:"pushBellowsButtonPress"},
  {note:"A4",buttonIndex:3, action:"pushBellowsButtonPress"},
  {note:"A4",buttonIndex:14,action:"pullBellowsButtonPress"},
  {note:"A4",buttonIndex:22,action:"pullBellowsButtonPress"},
  {note:"Bb4",buttonIndex:4,action:"pullBellowsButtonPress"},
  {note:"A#4",buttonIndex:4,action:"pullBellowsButtonPress"},
  {note:"C4",buttonIndex:12,action:"pushBellowsButtonPress"},
  {note:"B3",buttonIndex:11,action:"pullBellowsButtonPress"},
  {note:"B3",buttonIndex:20,action:"pushBellowsButtonPress"},
  {note:"B4",buttonIndex:15,action:"pullBellowsButtonPress"},
  {note:"B4",buttonIndex:23,action:"pushBellowsButtonPress"},
  {note:"Bb3",buttonIndex:1,action:"pullBellowsButtonPress"},
  {note:"A#3",buttonIndex:1,action:"pullBellowsButtonPress"},
  {note:"C5",buttonIndex:15,action:"pushBellowsButtonPress"},
  {note:"C5",buttonIndex:23,action:"pullBellowsButtonPress"},
  {note:"A3",buttonIndex:1, action:"pushBellowsButtonPress"},
  {note:"A3",buttonIndex:20,action:"pullBellowsButtonPress"},
  {note:"Db5",buttonIndex:5,action:"pushBellowsButtonPress"},
  {note:"C#5",buttonIndex:5,action:"pushBellowsButtonPress"},
  {note:"D5",buttonIndex:16,action:"pullBellowsButtonPress"},
  {note:"D5",buttonIndex:24,action:"pushBellowsButtonPress"},
  {note:"Eb5",buttonIndex:5,action:"pullBellowsButtonPress"},
  {note:"D#5",buttonIndex:5,action:"pullBellowsButtonPress"},
  {note:"G3",buttonIndex:10,action:"pullBellowsButtonPress"},
  {note:"G3",buttonIndex:11,action:"pushBellowsButtonPress"},
  {note:"E5",buttonIndex:16,action:"pushBellowsButtonPress"},
  {note:"E5",buttonIndex:24,action:"pullBellowsButtonPress"},
  {note:"F3",buttonIndex:0, action:"pullBellowsButtonPress"},
  {note:"F5",buttonIndex:17,action:"pullBellowsButtonPress"},
  {note:"E3",buttonIndex:0, action:"pushBellowsButtonPress"},
  {note:"Gb5",buttonIndex:25,action:"pullBellowsButtonPress"},
  {note:"F#5",buttonIndex:25,action:"pullBellowsButtonPress"},
  {note:"G5",buttonIndex:6, action:"pullBellowsButtonPress"},
  {note:"G5",buttonIndex:17,action:"pushBellowsButtonPress"},
  {note:"G5",buttonIndex:25,action:"pushBellowsButtonPress"},
  {note:"Ab5",buttonIndex:7,action:"pushBellowsButtonPress"},
  {note:"G#5",buttonIndex:7,action:"pushBellowsButtonPress"},
  {note:"A5",buttonIndex:6, action:"pushBellowsButtonPress"},
  {note:"A5",buttonIndex:18,action:"pullBellowsButtonPress"},
  {note:"A5",buttonIndex:26,action:"pullBellowsButtonPress"},
  {note:"Bb5",buttonIndex:7,action:"pullBellowsButtonPress"},
  {note:"A#5",buttonIndex:7,action:"pullBellowsButtonPress"},
  {note:"C3",buttonIndex:10,action:"pushBellowsButtonPress"},
  {note:"B5",buttonIndex:19,action:"pullBellowsButtonPress"},
  {note:"B5",buttonIndex:26,action:"pushBellowsButtonPress"},
  {note:"C6",buttonIndex:18,action:"pushBellowsButtonPress"},
  {note:"C6",buttonIndex:27,action:"pullBellowsButtonPress"},
  {note:"Db6",buttonIndex:8,action:"pushBellowsButtonPress"},
  {note:"C#6",buttonIndex:8,action:"pushBellowsButtonPress"},
  {note:"D6",buttonIndex:27,action:"pushBellowsButtonPress"},
  {note:"Eb6",buttonIndex:8,action:"pullBellowsButtonPress"},
  {note:"D#6",buttonIndex:8,action:"pullBellowsButtonPress"},
  {note:"E6",buttonIndex:19,action:"pushBellowsButtonPress"},
  {note:"E6",buttonIndex:28,action:"pullBellowsButtonPress"},
  {note:"F6",buttonIndex:9, action:"pullBellowsButtonPress"},
  {note:"Gb6",buttonIndex:29,action:"pullBellowsButtonPress"},
  {note:"F#6",buttonIndex:29,action:"pullBellowsButtonPress"},
  {note:"G6",buttonIndex:28,action:"pushBellowsButtonPress"},
  {note:"A6",buttonIndex:9, action:"pushBellowsButtonPress"},
  {note:"B6",buttonIndex:29,action:"pushBellowsButtonPress"},
]
