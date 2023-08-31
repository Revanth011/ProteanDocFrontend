import Observation from "./pages/observation/Observation";
import ReportsHome from "./pages/reports/ReportsHome";
import ReportCreate from "./pages/reports/ReportCreate";
import Report from "./pages/reports/Report";
import AddVulnerability from "./pages/vulnerability/AddVulnerability";
import EditObservation from "./pages/observation/EditObservation";
import Vulnerabilities from "./pages/vulnerability/Vulnerabilities";
import EditVulnerability from "./pages/vulnerability/EditVulnerability";
import Button from '@mui/material/Button';

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
  {
    path: "/vulnerability/edit/:vId",
    element: <EditVulnerability />,
  },
  {
    path: "/vulnerabilities",
    element: <Vulnerabilities />,
  },
]);

export default function App() {
  return (
    <div className="">
      <a href="/">
        <Button size="small" variant="outlined" style={{ margin: "0.4rem 0" }}>Home</Button>
      </a>
      <RouterProvider router={router} />
    </div>
  )
}
