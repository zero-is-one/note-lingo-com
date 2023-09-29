import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageStart } from "./components/PageStart/PageStart";
import { PageStudy } from "./components/PageStudy/PageStudy";
import { PageMicTest } from "./components/PageMicTest/PageMicTest";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <PageStart />,
    },
    {
      path: "/study",
      element: <PageStudy />,
    },
    {
      path: "/mic-test",
      element: <PageMicTest />,
    },
    {
      path: "/*",
      element: <div>404 not found</div>,
    },
  ],
  { basename: `/note-lingo-com` }
);

export const Router = () => <RouterProvider router={router} />;
