import React, { useEffect, useContext } from 'react';
import {useDispatch} from 'react-redux';
import { authUser } from '../store/actions/currentUser';

const AuthenticateUserScreen = () => {
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(authUser());
  }, []);

  return null;
};

export default AuthenticateUserScreen;
