const express = require('express');
const router = express.Router();
const { createUser, getAllUsers } = require('../controllers/adminController');

router.post('/create-user', createUser);
router.get('/users', getAllUsers);

module.exports = router;
