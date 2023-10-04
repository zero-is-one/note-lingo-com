import { ReactNode } from "react";
import { Note as NoteImp, NoNote } from "@tonaljs/core";

export type Note = NoteImp;

export type NoteOrNoNote = Note | NoNote;

export type InstrumentButtonAction =
  | "pushBellowsButtonPress"
  | "pullBellowsButtonPress";

export type InstrumentBehavior = {
  action: InstrumentButtonAction;
  note: string;
};

export type InstrumentButton = {
  behaviors: InstrumentBehavior[];
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
  // size?: number;
  // position?: {
  //   x: number;
  //   y: number;
  // };
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
