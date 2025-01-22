import React from 'react';
import AppRoutes from './routes/routes';
import AuthProvider from './context/AuthContext';

const Main = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default Main;
