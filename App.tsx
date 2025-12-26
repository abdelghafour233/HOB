
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Dashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';
import Editor from './pages/admin/Editor';
import { storage } from './services/storage';

// Fix for errors on lines 34, 42, 50: Making children optional in the type definition 
// ensures that the TypeScript compiler satisfies the requirement even when the component 
// is nested inside JSX props.
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  if (!storage.isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostDetail />} />
          <Route path="/category/:category" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/new" 
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/edit/:id" 
            element={
              <ProtectedRoute>
                <Editor />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
