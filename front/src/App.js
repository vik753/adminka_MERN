import { useEffect, createRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { AuthHook } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar/Navbar";
import { useMessages } from "./hooks/messenger.hook";
import { Messenger } from "./components/Messenger/Messenger";
import styles from "./index.module.scss";
import { showMessageAnimation } from "./helpers/animations";

const App = () => {
  const [messages, showMessage, deleteMessage] = useMessages(10000);
  const { jwtToken, userId, roles, saveLogin, logout, ready } = AuthHook();
  const isAuthenticated = !!jwtToken;
  const messageEl = createRef();

  const routes = useRoutes(isAuthenticated, roles);

  useEffect(() => {
    showMessageAnimation(messageEl.current);
  }, [messages]);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        jwtToken,
        userId,
        roles,
        saveLogin,
        logout,
        showMessage,
      }}
    >

      <Router>
        {!!messages.length &&
        messages.map((obj, index) => (
          <Messenger
            ref={messageEl}
            key={obj.id}
            params={{ ...obj, index, deleteMessage }}
          />
        ))}
        {isAuthenticated && <Navbar />}
        {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
