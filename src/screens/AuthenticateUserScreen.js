import React, { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { authUser, getUser } from "../store/actions/currentUser";

const AuthenticateUserScreen = () => {
  //it checks to see if the user is already signed in
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(authUser());
  }, []);

  return null;
};

export default AuthenticateUserScreen;
