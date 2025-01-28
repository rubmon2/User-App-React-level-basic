import React from 'react';
import { useUserContext } from '../contenxt/UserContext.js';

export const ProfilePage = () => {
  const { user, isAuthenticate } = useUserContext();

  if (isAuthenticate) {
    return console.log('this is user, from profilie page authentica', user);
  }
  return <div>ProfilePage</div>;
};
