import React from 'react';
import PropTypes from 'prop-types';
import { Route, Navigate } from 'react-router-dom';
import { verifySession } from "./api/services"
import { useNavigate } from 'react-router-dom';
import store from './context/store'
import { Provider } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { setName } from './context/auth'

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = localStorage.getItem("token");
  const DEFAULT_ERROR = 'Something went wrong - Please try again later.';

  if (authToken == undefined || authToken == null || authToken == "") {
    return <Navigate to="/login" />
  }
  else {
    (async () => {
      var res = await verifySession(authToken)
      if (res.status == 401) {
        localStorage.removeItem("token")
        navigate("/login")
      }
      else if (res == DEFAULT_ERROR) {
        localStorage.removeItem("token")
        navigate("/login")
      }
      dispatch(setName(res.firstName + " " + res.lastName))
    })();
  }
  return children
};

export default PublicRoute;