import jwt from 'jsonwebtoken';
import crypto from 'crypto'; 

export const generateToken = (id) => {
  try {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });
  } catch (error) {
    console.error("Jwt issue");
    return null;
  }
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("Jwt issue");
    return null;
  }
};

export const generateResetToken = () => {
  return crypto.randomBytes(20).toString('hex');
};
