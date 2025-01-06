import { sequelize } from '../config/db.js'; 
import { DataTypes } from 'sequelize';
import Users from './users.js'; 

//This code is changed
const PassResetTokens = sequelize.define('PassResetTokens', {
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
  due_date: {
    type: DataTypes.DATE,
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
  tableName: 'pwtokens', 
  timestamps: false,  
});


PassResetTokens.belongsTo(Users, { foreignKey: 'user_id', onDelete: 'CASCADE' });

export default PassResetTokens;
