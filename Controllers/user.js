import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../Model/User.js";

export const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  
  if(name.length === 0 || email.length === 0 || password.length === 0) return res.status(400).json({message:"all fields are required", success:false});

  let user = await User.findOne({email});

  if(user) return res.status(400).json({message:"user already exists", success:false});

  const hashPassword = await bcrypt.hash(password, 10);
  
  user = await User.create({ name, email, password:hashPassword});

  res.status(201).json({message:"user created", user, success:true});
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if(email.length === 0 || password.length === 0) return res.status(400).json({message:"all fields are required", success:false});

  const user = await User.findOne({email});

  if(!user) return res.status(200).json({message:"user does not exists", success:false});

  const validPass = await bcrypt.compare(password, user.password);

  if(!validPass) return res.status(200).json({message:"invalid credentials", success:false});

  const token = jwt.sign({userId:user._id}, process.env.JWT, {expiresIn:'1d'} );

  res.status(200).json({message:`welcome ${user.name}`, token, success:true});
}