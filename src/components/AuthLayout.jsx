import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authservice from '../appwrite/auth.js';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [authStatus, setAuthStatus] = useState(null);  // null for loading state

  useEffect(() => {
    async function fetchData() {
      const res = await authservice.getCurrentUser();

      if (res) {
        setAuthStatus(true);  // User is authenticated
      } else {
        setAuthStatus(false);  // No user, not authenticated
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (authStatus === null) return;  // Wait until authStatus is determined

    if (authentication && !authStatus) {
      // If authentication is required and the user is not authenticated, redirect to login
      navigate('/login');
    } else if (!authentication && authStatus) {
      // If no authentication is required and the user is authenticated, redirect to home
      navigate('/');
    } else {
      setLoader(false);  // Once the authentication status is set, stop loading
    }
  }, [authStatus, navigate, authentication]);

  if (loader) {
    return <h1>Loading...</h1>;  // You can replace this with a spinner or loading component
  }

  return <>{children}</>;
}
