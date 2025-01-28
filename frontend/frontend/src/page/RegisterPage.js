import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../component';
import { useUserContext } from '../contenxt/UserContext.js';
export const RegisterPage = () => {
  const { registerUser, errores, setErrores } = useUserContext();
  const navTo = useNavigate();
  const payload = { name: '', email: '', password: '' };
  const [user, setUSer] = useState(payload);
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setUSer({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user.name || !user.email || !user.password) {
        setErrores('complete all fields');
        return;
      }

      await registerUser(user);
      navTo('/profile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Register Your Users</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <RegisterForm
          onInputChange={onInputChange}
          user={user}
          errores={errores}
        ></RegisterForm>
      </form>
    </div>
  );
};
