import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StartPage from './Component/StartPage';
import ExamPage from './Component/ExamPage';
// import SignupPage from './Component/SignupPage';
// import LoginPage from './Component/LoginPage';
import AuthPage from './Component/AuthPage'; // New AuthPage
import { auth } from './firebase'; 
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); 
  }, []);

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/auth" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/auth" element={<AuthPage />} /> {/* AuthPage for login/signup */}
        <Route path="/exam" element={<ProtectedRoute><ExamPage /></ProtectedRoute>} />
        {/* <Route path="/signup" element={<SignupPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
      </Routes>

      {user && (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={() => auth.signOut()}>Logout</button>
        </div>
      )}
    </Router>
  );
};

export default App;
