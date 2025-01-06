import bcrypt from 'bcryptjs';
import { body, validationResult } from 'express-validator';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import { restPassword } from '../service/passwordServices.js';

export const registerUser = [
  // Validation middleware
  body('email')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name')
    .notEmpty().withMessage('Name is required'),

  // Handler
  async (req, res) => {
    // Check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password, name, created_at } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const user = await User.create({
        email,
        password_hash: hashedPassword,  // Save the hashed password
        name,
        created_at,
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
];


  

// Login user
export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password_hash); // Compare hashed password
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '8h' });
  
      res.json({ token, user });
    } catch (error) {
      console.error(error); // Log error details
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
 
  export const requestPasswordRest = async (req, res) => {
    try {
      const { email } = req.body;
      const result = await restPassword(email);
      res.status(200).json({ message: 'Password rest email sent successuflly',data:result });
    } catch (error) {
      console.error(error); // Log error details
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };