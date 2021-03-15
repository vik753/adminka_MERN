import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { AuthHook } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar/Navbar";

const App = () => {
  const { jwtToken, userId, roles, saveLogin, logout, ready } = AuthHook();
  const isAuthenticated = !!jwtToken;

  const routes = useRoutes(isAuthenticated, roles);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, jwtToken, userId, roles, saveLogin, logout }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
