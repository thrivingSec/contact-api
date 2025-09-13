import express from 'express';
import { userLogin, userRegister } from '../Controllers/user.js';

const router = express.Router()

// @api dsc: user register
// @api method: POST
// @api endpoint: /api/user/register
router.post('/register', userRegister)

// @api dsc: user login
// @api method: POST
// @api endpoint: /api/user/login
router.post('/login', userLogin);

export default router;