const User = require('../models/User');

// Get users (for task assignment dropdowns)
exports.getUsers = async (req, res) => {
  try {
    // Only return users that can be assigned tasks (workers and managers)
    const users = await User.find({
      role: { $in: ['site_worker', 'project_manager'] }
    }).select('name email role');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

