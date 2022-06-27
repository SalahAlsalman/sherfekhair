import { async } from '@firebase/util';
import React, { useState, useContext, useEffect } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = async (username, email, password, role) => {
    const user = {
      username,
      email,
      password,
      role: role.toLowerCase(),
    };
    const request = await fetch('/api/v1/auth/register', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    });
    const data = await request.json();
    if (request.status === 201) {
      setCurrentUser({ username });
      return data;
    } else if (request.status === 400) {
      //return erorr
    } else {
      return;
    }
  };

  const login = async (username, password) => {
    const request = await fetch('/api/v1/auth/login', {
      headers: {
        Authorization: `Basic ${window.btoa(username + ':' + password)}`,
      },
      method: 'POST',
    });
    const data = await request.json();
    if (data.status === 200) {
      setCurrentUser({ username });
      return data;
    }
  };

  const value = {
    currentUser,
    signup,
    login,
  };

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const request = await fetch('/api/v1/auth/login', {
  //       headers: { 'content-type': 'application/json' },
  //       method: 'POST',
  //     });
  //     const data = await request.json();
  //     setCurrentUser(data);
  //     setLoading(false);
  //   };
  //   try {
  //     fetchUser();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
