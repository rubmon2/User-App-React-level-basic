import React from 'react';

const LoginForm = ({ user, errores, onInputChange }) => {
  return (
    <div>
      <div>
        <label>Email</label>
        <input
          onChange={onInputChange}
          placeholder="email"
          type="email"
          value={user.email}
          name="email"
        ></input>
      </div>
      <div>
        <label>password</label>
        <input
          onChange={onInputChange}
          placeholder="password"
          type="password"
          value={user.password}
          name="password"
        ></input>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>

      {errores && <p>{errores}</p>}
    </div>
  );
};

export default LoginForm;
