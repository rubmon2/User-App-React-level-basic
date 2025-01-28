import React from 'react';

const RegisTerForm = ({ user, errores, onInputChange }) => {
  return (
    <div>
      <div>
        <div>
          <label>Name</label>
          <input
            onChange={onInputChange}
            type="text"
            placeholder=""
            value={user.name}
            name="name"
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            onChange={onInputChange}
            type="email"
            placeholder=""
            value={user.email}
            name="email"
          ></input>
        </div>
        <div>
          <label>password</label>
          <input
            onChange={onInputChange}
            type="password"
            placeholder=""
            value={user.password}
            name="password"
          ></input>
        </div>
      </div>
      <div>
        <button type="submit">submit</button>
      </div>
      {errores && <div>{errores}</div>}
    </div> //div final
  );
};

export default RegisTerForm;
