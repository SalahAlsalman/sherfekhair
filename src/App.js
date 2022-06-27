import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Spinner,
} from '@chakra-ui/react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';
import MyClasses from './pages/MyClasses';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route element={<RequireAuth />}>
              <Route path="/myclasses" element={<MyClasses />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
