import { useRef, useEffect } from "react";
import {
  Renderer,
  Stave,
  StaveNote,
  Formatter,
  Accidental,
  RendererBackends,
  SVGContext,
} from "vexflow";

// https://github.com/erhant/tools/blob/3b473f1ce24be674067969c928917558b47bfd36/src/lib/music/vexflow.ts#L2
// https://github.com/0xfe/vexflow/issues/134
// https://github.com/opensheetmusicdisplay/react-opensheetmusicdisplay/blob/master/src/lib/OpenSheetMusicDisplay.jsx

export type MusicClef = "bass" | "treble" | "alto" | "tenor";

export const VexflowRenderer = ({ numb }: { numb: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // prepare renderer
      const ele = containerRef.current;

      if (!rendererRef.current) {
        rendererRef.current = new Renderer(ele, RendererBackends.SVG);
      }
      rendererRef.current.resize(600, 600);
      const ctx = rendererRef.current.getContext() as SVGContext;
      ctx.setViewBox(0, 0, 200, 200);

      ctx.save(); // save empty context

      // create the stave
      const stave = new Stave(0, 0, ele.offsetWidth);
      stave
        .addClef("treble" as MusicClef)
        //.addTimeSignature(`4/${numb}`)
        .addKeySignature("C")
        .setContext(ctx)

        .draw();

      const note = new StaveNote({
        keys: [`c/4`],
        duration: "q",
        clef: "treble",
      });

      note.addModifier(new Accidental("#"), 0);

      const stavenotes = [note];

      Formatter.FormatAndDraw(ctx, stave, stavenotes);
    }

    return () => {
      rendererRef.current?.getContext().clear();
    };
  }, [numb]);

  return <div ref={containerRef} />;
};
