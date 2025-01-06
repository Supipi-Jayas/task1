import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs'; // Import bcrypt

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    },
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: false,  
});

// Add a method to compare passwords
Users.prototype.comparePassword = function(password) {
  return bcrypt.compare(password, this.password_hash);
};


export default Users;
