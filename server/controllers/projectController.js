const Project = require('../models/Project');
const Task = require('../models/Task');

// Get projects (client sees only their projects; worker sees projects with their tasks)
exports.getProjects = async (req, res) => {
  try {
    let query = {};

    if (req.user.role === 'project_manager') {
      query.manager = req.user._id;
    } else if (req.user.role === 'client') {
      query.client = req.user._id;
    } else if (req.user.role === 'site_worker') {
      const userTasks = await Task.find({ assignedTo: req.user._id }).distinct('project');
      query._id = { $in: userTasks };
    }

    const projects = await Project.find(query)
      .populate('manager', 'name email')
      .populate('client', 'name email')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single project (client can view only their own projects; includes status)
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('manager', 'name email')
      .populate('client', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.user.role === 'project_manager') {
      const managerId = project.manager?._id?.toString() || project.manager?.toString();
      if (managerId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You do not have permission to view this project' });
      }
    } else if (req.user.role === 'client') {
      const clientId = project.client?._id?.toString() || project.client?.toString();
      if (!clientId || clientId !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You do not have permission to view this project' });
      }
    } else if (req.user.role === 'site_worker') {
      const userTasks = await Task.find({ assignedTo: req.user._id, project: project._id });
      if (userTasks.length === 0) {
        return res.status(403).json({ message: 'You do not have permission to view this project' });
      }
    }
    // Admins can view all

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create project
exports.createProject = async (req, res) => {
  try {
    const canCreate = req.user.role === 'admin' || req.user.role === 'project_manager';
    
    if (!canCreate) {
      return res.status(403).json({ message: 'You do not have permission to create projects' });
    }

    const project = new Project(req.body);
    await project.save();
    
    const populatedProject = await Project.findById(project._id)
      .populate('manager', 'name email')
      .populate('client', 'name email');

    res.status(201).json(populatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const canUpdate = req.user.role === 'admin' || 
                     (req.user.role === 'project_manager' && project.manager.toString() === req.user._id.toString());
    
    if (!canUpdate) {
      return res.status(403).json({ message: 'You do not have permission to update this project' });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('manager', 'name email')
     .populate('client', 'name email');

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You do not have permission to delete projects' });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

