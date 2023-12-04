import { useRoutes } from "react-router-dom";
import { ROUTES_CONFIG } from "./config/routes";

function App() {
  const routes = useRoutes(ROUTES_CONFIG);

  return <main>{routes}</main>;
}

export default App;
