import { useState, useCallback, useEffect } from "react";

const authStoreName = "adminka_auth";

export const AuthHook = () => {
  const [jwtToken, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [roles, setRoles] = useState([]);
  const [ready, setReady] = useState(false);

  const saveLogin = useCallback((token = null, id = null, roles = [], userName = null) => {
    if (!token || !id || !roles.length) {
      throw new Error("Token and user Id and user Roles are required!");
    }
    setToken(token);
    setUserId(id);
    setRoles(roles);
    setUserName(userName);
    localStorage.setItem(authStoreName, JSON.stringify({ token, id, roles, userName }));
  }, []);

  const logout = useCallback(() => {
    setReady(false)
    localStorage.removeItem(authStoreName);
    setToken(null);
    setUserId(null);
    setRoles([]);
    setReady(true);
    setUserName(null);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(authStoreName));
    if (data && data.token) {
      setToken(data.token);
      setUserId(data.id);
      setRoles(data.roles);
      setUserName(data.userName);
    }
    setReady(true);
  }, [saveLogin]);

  return { jwtToken, userId, roles, saveLogin, logout, ready, userName };
};
