import { Navigate } from 'react-router-dom';
import ObservationAdd from "./pages/observation/ObservationAdd";
import ReportsHome from "./pages/reports/ReportsHome";
import ReportCreate from "./pages/reports/ReportCreate";
import Report from "./pages/reports/Report";
import AddVulnerability from "./pages/vulnerability/AddVulnerability";
import ObservationEdit from "./pages/observation/ObservationEdit";
import Vulnerabilities from "./pages/vulnerability/Vulnerabilities";
import EditVulnerability from "./pages/vulnerability/EditVulnerability";
import ViewVulnerability from "./pages/vulnerability/ViewVulnerability";
import Login from "./pages/auth/login/Login";
import Home from "./pages/Home";

const routes = () => [
    {
        path: "/",
        element: localStorage.getItem("isLoggedIn") ? <Home /> : <Navigate to="/login" />,
        children: [
            {
                path: "/",
                element: <ReportsHome />,
            },
            {
                path: "/observation/create/:reportId",
                element: <ObservationAdd />,
            },
            {
                path: "/observation/edit/:reportId/:observationId",
                element: <ObservationEdit />,
            },
            {
                path: "report/create",
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
                path: "/vulnerability/view/:vId",
                element: <ViewVulnerability />,
            },
            {
                path: "/vulnerabilities",
                element: <Vulnerabilities />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
];

export default routes;
