import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import WorkerDashboard from './pages/Worker/WorkerDashboard';
import Tasks from './pages/tasks/Tasks';
import ProjectDetail from './pages/projects/ProjectDetail';
import Toast from './components/common/Toast';

const App = () => {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/worker" element={<WorkerDashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
          <Toast />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
};

export default App;

