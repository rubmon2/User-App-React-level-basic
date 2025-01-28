import React, { useEffect } from 'react';
import { useUserContext } from '../../contenxt/UserContext.js';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { isAuthenticate, loading, errores } = useUserContext();
  const navTo = useNavigate();
  useEffect(() => {
    if (!loading && isAuthenticate) {
      navTo('/profile'); // Navega a profile solo cuando loading es false y el usuario está autenticado.
    }
  }, [loading, isAuthenticate]); // Este efecto depende de loading e isAuthenticate.
  if (loading)
    return (
      <div>
        <div>Cargando...</div>
        {errores && (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{errores}</p>
        )}
      </div>
    );

  return isAuthenticate ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
