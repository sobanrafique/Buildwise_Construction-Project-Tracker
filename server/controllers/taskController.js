// Task Controller - manager-focused operations
const Task = require('../models/Task');
const Project = require('../models/Project');

// Get all tasks with role-based visibility
exports.getTasks = async (req, res) => {
  try {
    let query = {};

    if (req.user?.role === 'site_worker') {
      query.assignedTo = req.user._id;
      if (req.query.project) {
        query.project = req.query.project;
      }
    } else if (req.user?.role === 'project_manager') {
      query.assignedTo = req.user._id;
      if (req.query.project) {
        query.project = req.query.project;
      }
    } else if (req.user?.role === 'client') {
      const projects = await Project.find({ client: req.user._id }).distinct('_id');
      if (projects.length > 0) {
        if (req.query.project) {
          if (projects.some((p) => p.toString() === req.query.project)) {
            query.project = req.query.project;
          } else {
            query.project = { $in: [] };
          }
        } else {
          query.project = { $in: projects };
        }
      } else {
        query.project = { $in: [] };
      }
    } else if (req.user?.role === 'admin') {
      if (req.query.project) {
        query.project = req.query.project;
      }
    }

    const tasks = await Task.find(query)
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    const populatedTask = await Task.findById(task._id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    res.status(201).json(populatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update task (includes assignedTo/progress/status)
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user?.role === 'site_worker' || req.user?.role === 'project_manager') {
      if (task.assignedTo.toString() !== req.user._id?.toString()) {
        return res.status(403).json({ message: 'You do not have permission to update this task' });
      }
    } else if (req.user?.role === 'client') {
      return res.status(403).json({ message: 'You do not have permission to update tasks' });
    }

    if (req.body.status === 'completed' && task.status !== 'completed') {
      req.body.completedAt = new Date();
      req.body.progress = 100;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

