import { ReactNode } from "react";
import { Note as NoteImp, NoNote } from "@tonaljs/core";

export type Note = NoteImp;

export type NoteOrNoNote = Note | NoNote;

export type InstrumentButtonAction =
  | "pushBellowsButtonPress"
  | "pullBellowsButtonPress"
  | "buttonPress";

export type InstrumentBehavior = {
  action: InstrumentButtonAction;
  note: string;
};

type Behaviors =
  | [
      InstrumentBehavior & {
        action: "pushBellowsButtonPress";
      },
      InstrumentBehavior & {
        action: "pullBellowsButtonPress";
      }
    ]
  | [
      InstrumentBehavior & {
        action: "pullBellowsButtonPress";
      },
      InstrumentBehavior & {
        action: "pushBellowsButtonPress";
      }
    ]
  | [
      InstrumentBehavior & {
        action: "buttonPress";
      }
    ];

export type InstrumentButton = {
  behaviors: Behaviors;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
};

export type InstrumentButtonModifer = {
  id: number;
  label?: string | ReactNode;
  color?: string;
  background?: string;
  borderRadius?: number;
  fontSize?: string;
};

export type Instrument = {
  id: string;
  name: string;
  buttons: InstrumentButton[];
};

export type FlashcardGenre = "sound" | "name" | "notation";

export type Flashcard = {
  id: string;
  note: string;
  buttonIndex: number;
  action: InstrumentButtonAction;
  genre: FlashcardGenre;
};

export type ButtonInput = {
  instrument: Instrument;
  buttonIndex: number;
  action: InstrumentButtonAction;
};

export type NumberingSystem = string[];
