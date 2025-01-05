import express from 'express';
import { registerUser, loginUser, requestPasswordRest } from './../controllers/userController.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/resrt-password', requestPasswordRest);
// // Get all users
// router.get('/users', getAllUsers);

// // Get user by ID
// router.get('/users/:id', getUserById);

// Export the router using ES Module export
export default router;

