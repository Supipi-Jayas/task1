import { sequelize } from '../config/db.js'; 
import { DataTypes } from 'sequelize';
import Users from '../models/users.js'; 


const Tasks = sequelize.define('Tasks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Users, 
      key: 'id',
    },
    onDelete: 'CASCADE', 
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  priority: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'tasks', 
  timestamps: false,  
});


Tasks.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default Tasks;
