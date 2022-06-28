import { async } from '@firebase/util';
import React, { useState, useContext, useEffect } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('username')
  );
  const [loadingPage, setLoadingPage] = useState(true);

  const signup = async (username, email, password, role) => {
    const user = {
      username,
      email,
      password,
      role: role.toLowerCase(),
    };
    try {
      const request = await fetch('/api/v1/auth/register', {
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(user),
      });
      const data = await request.json();
      if (request.status === 201) {
        login(username, password);
        return data;
      } else if (request.status === 400) {
        setCurrentUser(null);
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const login = async (username, password) => {
    const request = await fetch('/api/v1/auth/login', {
      headers: {
        Authorization: `Basic ${window.btoa(username + ':' + password)}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
      method: 'POST',
    });

    if (request.status === 200) {
      const data = await request.json();
      localStorage.setItem('username', username);
      setCurrentUser({ username });
      return data;
    } else {
      localStorage.removeItem('username');
      setCurrentUser(null);
    }
  };

  const logout = async () => {
    try {
      const request = await fetch('/api/v1/auth/logout');
      const data = await request.json();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const request = await fetch('/api/v1/auth/login', {
        headers: { 'content-type': 'application/json' },
        method: 'POST',
      });

      if (request.status === 200) {
        const data = await request.json();
        setLoadingPage(false);
        return;
      } else if (request.status === 401) {
        localStorage.removeItem('username');
        setCurrentUser(null);
        setLoadingPage(false);
        return;
      }
    };
    try {
      fetchUser();
    } catch (error) {
      setLoadingPage(false);
    }
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    loadingPage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
