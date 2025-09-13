import jwt from 'jsonwebtoken';
import { User } from '../Model/User.js'

export const authenticate = async (req, res, next) => {
  const token = req.header('Auth');

  if(!token) return res.status(400).json({message:"login required", success:false});

  try {
    const decode = jwt.verify(token, process.env.JWT);
    const user = await User.findById(decode.userId);

    if(!user) return res.status(400).json({message:"token invalid", success:false});

    req.user = user;
    next()

  } catch (error) {
    console.log('Error occoured in token verification');
    return res.status(400).json({message:"token invalid", success:false});
  }
  
};