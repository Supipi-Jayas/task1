import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import tasksRoutes from './routes/tasksRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { getAllTasks } from './controllers/taskControllers.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// API Routes

app.use('/api/tasks', tasksRoutes);
app.use('/api/user', userRoutes);
app.get('api/tasks', getAllTasks);


// Serve Frontend
// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, 'frontend', 'build')));
 
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
// });

// Start the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
