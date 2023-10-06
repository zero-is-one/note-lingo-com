import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageStudy } from "@/components/PageStudy/PageStudy";
import { PageMicTest } from "@/components/PageMicTest/PageMicTest";
import { PageTest } from "@/components/PageTest/PageTest";
import { PagePracticeCooverNotation } from "@/components/PagePracticeCooverNotation/PagePracticeCooverNotation";
import { PagePracticeNotes } from "@/components/PagePracticeNotes/PagePracticeNotes";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PageStudy />,
    },
    {
      path: "/study",
      element: <PageStudy />,
    },
    {
      path: "/study/practice/note",
      element: <PagePracticeNotes />,
    },
    {
      path: "/study/practice/coover-notation",
      element: <PagePracticeCooverNotation />,
    },
    {
      path: "/mic-test",
      element: <PageMicTest />,
    },
    {
      path: "/test",
      element: <PageTest />,
    },
    {
      path: "/*",
      element: <div>404 not found</div>,
    },
  ],
  { basename: `/note-lingo-com` }
);

export const Router = () => <RouterProvider router={router} />;
