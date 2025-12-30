import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, task, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    progress: 0,
    deadline: '',
    project: '',
    assignedTo: ''
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error: showError, success: showSuccess } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          status: task.status || 'pending',
          progress: task.progress || 0,
          deadline: task.deadline ? new Date(task.deadline).toISOString().split('T')[0] : '',
          project: task.project?._id || '',
          assignedTo: task.assignedTo?._id || ''
        });
      } else {
        setFormData({
          title: '',
          description: '',
          status: 'pending',
          progress: 0,
          deadline: '',
          project: '',
          assignedTo: ''
        });
      }
      fetchProjects();
      fetchUsers();
    }
  }, [isOpen, task]);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      // If endpoint doesn't exist, set empty array
      setUsers([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (task) {
        // Workers can only update status and progress
        const updateData = (user?.role === 'site_worker') 
          ? { status: formData.status, progress: formData.progress }
          : formData;
        await api.put(`/tasks/${task._id}`, updateData);
        showSuccess('Task updated successfully');
      } else {
        await api.post('/tasks', formData);
        showSuccess('Task created successfully');
      }
      onSuccess();
      onClose();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  const isWorkerEdit = task && (user?.role === 'site_worker');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {!isWorkerEdit && (
            <>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  disabled={isWorkerEdit}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                  disabled={isWorkerEdit}
                />
              </div>
            </>
          )}
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
              </select>
            </div>
            <div className="form-group">
              <label>Progress (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
              />
            </div>
          </div>
          {isWorkerEdit ? (
            <>
              <div className="form-group">
                <label>Project</label>
                <input
                  type="text"
                  value={task?.project?.name || 'N/A'}
                  disabled
                  className="readonly-input"
                />
              </div>
              <div className="form-group">
                <label>Assigned To</label>
                <input
                  type="text"
                  value={task?.assignedTo?.name || 'N/A'}
                  disabled
                  className="readonly-input"
                />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="text"
                  value={task?.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}
                  disabled
                  className="readonly-input"
                />
              </div>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Deadline *</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Project *</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    required
                  >
                    <option value="">Select Project</option>
                    {projects.map((project) => (
                      <option key={project._id} value={project._id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Assign To *</label>
                  <select
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    required
                  >
                    <option value="">Select User</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;

