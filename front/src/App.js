import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";

const App = () => {
  const routes = useRoutes(false, "ADMIN");

  return (
    <Router>
      {routes}
    </Router>
  );
};

export default App;
