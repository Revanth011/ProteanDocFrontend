import "./styles.css";
import { useRoutes } from 'react-router-dom';
import routes from "../src/routes"

export default function App() {
  const routing = useRoutes(routes());

  return (
    <>
      {routing}
    </>
  )
}
