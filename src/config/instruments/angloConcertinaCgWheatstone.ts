import { Instrument, NumberingSystem } from "@/types";

//describe the physical layout of the instrument and functionality of each button
export const angloConcertinaCgWheatstoneInstrument: Instrument = {
  id: "anglo-concertina-cg-wheatstone",
  name: "Anglo Concertina - C/G Wheatstone",
  buttons: [
    // Row 1, Left
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "E3" },
        { action: "pullBellowsButtonPress", note: "F3" },
      ],
      position: { x: 1, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "A3" },
        { action: "pullBellowsButtonPress", note: "Bb3" },
      ],
      position: { x: 2, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "C#4" },
        { action: "pullBellowsButtonPress", note: "D#4" },
      ],
      position: { x: 3, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "A4" },
        { action: "pullBellowsButtonPress", note: "G4" },
      ],
      position: { x: 4, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G#4" },
        { action: "pullBellowsButtonPress", note: "Bb4" },
      ],
      position: { x: 5, y: 0 },
      size: { width: 1, height: 1 },
    },

    // Row 1, Right
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "C#5" },
        { action: "pullBellowsButtonPress", note: "D#5" },
      ],
      position: { x: 7, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "A5" },
        { action: "pullBellowsButtonPress", note: "G5" },
      ],
      position: { x: 8, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G#5" },
        { action: "pullBellowsButtonPress", note: "Bb5" },
      ],
      position: { x: 9, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "C#6" },
        { action: "pullBellowsButtonPress", note: "D#6" },
      ],
      position: { x: 10, y: 0 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "A6" },
        { action: "pullBellowsButtonPress", note: "F6" },
      ],
      position: { x: 11, y: 0 },
      size: { width: 1, height: 1 },
    },

    // Row 2,  Left
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "C3" },
        { action: "pullBellowsButtonPress", note: "G3" },
      ],
      position: { x: 1 - 0.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G3" },
        { action: "pullBellowsButtonPress", note: "B3" },
      ],
      position: { x: 2 - 0.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "C4" },
        { action: "pullBellowsButtonPress", note: "D4" },
      ],
      position: { x: 3 - 0.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "E4" },
        { action: "pullBellowsButtonPress", note: "F4" },
      ],
      position: { x: 4 - 0.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G4" },
        { action: "pullBellowsButtonPress", note: "A4" },
      ],
      position: { x: 5 - 0.5, y: 1 },
      size: { width: 1, height: 1 },
    },

    // Row 2,  Right
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "C5" },
        { action: "pullBellowsButtonPress", note: "B4" },
      ],
      position: { x: 1 + 6.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "E5" },
        { action: "pullBellowsButtonPress", note: "D5" },
      ],
      position: { x: 2 + 6.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G5" },
        { action: "pullBellowsButtonPress", note: "F5" },
      ],
      position: { x: 3 + 6.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "C6" },
        { action: "pullBellowsButtonPress", note: "A5" },
      ],
      position: { x: 4 + 6.5, y: 1 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "E6" },
        { action: "pullBellowsButtonPress", note: "B5" },
      ],
      position: { x: 5 + 6.5, y: 1 },
      size: { width: 1, height: 1 },
    },

    // Row 3,  Left
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "B3" },
        { action: "pullBellowsButtonPress", note: "A3" },
      ],
      position: { x: 1 - 1, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "D4" },
        { action: "pullBellowsButtonPress", note: "F#4" },
      ],
      position: { x: 2 - 1, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G4" },
        { action: "pullBellowsButtonPress", note: "A4" },
      ],
      position: { x: 3 - 1, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "B4" },
        { action: "pullBellowsButtonPress", note: "C5" },
      ],
      position: { x: 4 - 1, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "D5" },
        { action: "pullBellowsButtonPress", note: "E5" },
      ],
      position: { x: 5 - 1, y: 2 },
      size: { width: 1, height: 1 },
    },

    // Row 3,  Right
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G5" },
        { action: "pullBellowsButtonPress", note: "F#5" },
      ],
      position: { x: 1 + 7, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "B5" },
        { action: "pullBellowsButtonPress", note: "A5" },
      ],
      position: { x: 2 + 7, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "D6" },
        { action: "pullBellowsButtonPress", note: "C6" },
      ],
      position: { x: 3 + 7, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "G6" },
        { action: "pullBellowsButtonPress", note: "E6" },
      ],
      position: { x: 4 + 7, y: 2 },
      size: { width: 1, height: 1 },
    },
    {
      behaviors: [
        { action: "pushBellowsButtonPress", note: "B6" },
        { action: "pullBellowsButtonPress", note: "F#6" },
      ],
      position: { x: 5 + 7, y: 2 },
      size: { width: 1, height: 1 },
    },
  ],
};

export const cooverTablatureNumberingSystem: NumberingSystem = [
  ...["1a", "2a", "3a", "4a", "5a"],
  ...["1a", "2a", "3a", "4a", "5a"],
  ...["1", "2", "3", "4", "5"],
  ...["1", "2", "3", "4", "5"],
  ...["6", "7", "8", "9", "10"],
  ...["6", "7", "8", "9", "10"],
];
