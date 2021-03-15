import { Switch, Route, Redirect } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage/AuthPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import {LogoutPage} from "./pages/LogoutPage/LogoutPage";

export const useRoutes = (isAuth, userRole = ["USER"]) => {
  if (isAuth) {
    return (
      <Switch>
        <Route path="/home" component={HomePage} exact />
        {userRole.includes("ADMIN") && (
          <Route path="/admin" component={AdminPage} exact />
        )}
        <Route path="/logout" component={LogoutPage} exact />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={AuthPage} exact />
      <Redirect to="/" />
    </Switch>
  );
};
