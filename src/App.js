import Observation from "./pages/observation/Observation";
import ReportsHome from "./pages/reports/ReportsHome";
import ReportCreate from "./pages/reports/ReportCreate";
import Report from "./pages/reports/Report";
import AddVulnerability from "./pages/vulnerability/AddVulnerability";
import EditObservation from "./pages/observation/EditObservation";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ReportsHome />,
  },
  {
    path: "/observation/create/:reportId",
    element: <Observation />,
  },
  {
    path: "/observation/edit/:reportId/:observationId",
    element: <EditObservation />,
  },
  {
    path: "/report/create",
    element: <ReportCreate />,
  },
  {
    path: "/report/edit/:reportId",
    element: <Report />,
  },
  {
    path: "/vulnerability/create",
    element: <AddVulnerability />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
