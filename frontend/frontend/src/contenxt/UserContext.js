import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/api.js';

export const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('You need Login and Authorization');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const payload = { name: '', email: '' };
  const [user, setUser] = useState(payload);
  const [loading, setLoading] = useState(true);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [errores, setErrores] = useState(null);

  //login api
  const loginUser = async (state) => {
    try {
      const response = await api.post('/login', state);
      const { data } = response;
      localStorage.setItem('token', data);
      return data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        setErrores(error?.response?.data?.message);
      }
    }
  };

  //register api

  const registerUser = async (state) => {
    try {
      const response = await api.post('/register', state);
      const { data } = response;
      return data;
    } catch (error) {
      console.log(error);
      if (error?.response?.data) {
        setErrores(error?.response?.data?.message);
      }
    }
  };
  //lopout api

  const removeUser = async () => {
    try {
      const response = await api.post('/logout');
      const { data } = response;

      return data;
    } catch (error) {
      console.log('error in logout user', error);
      if (error?.response?.data) {
        setErrores(error?.response?.data?.message);
      }
    }
  };

  const logoutUser = async () => {
    const response = await removeUser();
    if (response) {
      setIsAuthenticate(false);
      setUser(payload);
      localStorage.removeItem('token');
    }
  };

  //check login
  //* check profile, checkea el usuario existente y la autorizacion del token//
  async function getUser() {
    const token = localStorage.getItem('token');

    try {
      const response = await api.post(
        '/profile',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { data } = response;
      return data;
    } catch (error) {
      console.log('error from get user', error);
      if (error?.response?.data) {
        setErrores(
          error?.response?.data?.message || 'Pls login again with a valid user',
        );
      }
    }
  }

  async function setterUser() {
    try {
      const response = await getUser();
      if (!response) {
        return;
      }
      setUser(response);
      setLoading(false);
      setIsAuthenticate(true);
    } catch (error) {
      console.log(error);
      setErrores(error?.response?.data?.message);
    }
  }

  async function checkLogin() {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        await setterUser();
      } else {
        setLoading(false);
        setIsAuthenticate(false);
        setUser({});
        return;
      }
    } catch (error) {
      console.log('Error in checklogin', error);
      setErrores('Error chequeando estado del usuario');
    }
  }

  useEffect(() => {
    let isMounted = true;

    const initCheckLogin = async () => {
      try {
        await checkLogin();
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initCheckLogin();

    return () => {
      isMounted = false;
    };
  }, [loading, isAuthenticate]);

  //useEffect errores
  useEffect(() => {
    if (errores) {
      console.log('iniciando el timer de errores');
      const timeOut = setTimeout(() => {
        setErrores(null);
      }, 4500);

      return () => {
        console.log('limpiando el timer');
        clearTimeout(timeOut);
      };
    }
  }, [errores]);

  return (
    <UserContext.Provider
      value={{
        isAuthenticate,
        logoutUser,
        registerUser,
        loginUser,
        loading,
        errores,
        user,
        setUser,
        setErrores,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
