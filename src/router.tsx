import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageStart } from "./components/PageStart/PageStart";
import { PageStudy } from "./components/PageStudy/PageStudy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageStart />,
  },
  {
    path: "/study",
    element: <PageStudy />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
