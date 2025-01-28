import React, { useState } from 'react';
import { LoginForm } from '../component';
import { useUserContext } from '../contenxt/UserContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const payload = { email: '', password: '' };
  const [user, setUser] = useState(payload);
  const { loginUser, errores, setErrores, setLoading } = useUserContext();
  const navTo = useNavigate();
  const onInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user.email || !user.password) {
        setErrores('complete all field and try again pls');
        return;
      }
      const response = await loginUser(user);
      if (response) {
        setLoading(true);
        navTo('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div> LoginPage, signIn pls</div>

      <div>
        <form onSubmit={handleSubmit}>
          <LoginForm
            user={user}
            onInputChange={onInputChange}
            errores={errores}
          ></LoginForm>
        </form>
      </div>
    </div>
  );
};
