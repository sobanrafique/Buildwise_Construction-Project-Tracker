import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import WorkerDashboard from './pages/Worker/WorkerDashboard';
import Tasks from './pages/tasks/Tasks';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/tasks" replace />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/worker" element={<WorkerDashboard />} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;

