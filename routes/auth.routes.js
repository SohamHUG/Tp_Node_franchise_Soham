import { Router } from 'express';
import { createUser, login } from "../controller/auth.controller.js";
import { validateSchema } from '../middleware/validationSchema.js';
import { registerSchema } from '../schema/registerSchema.js';

const router = Router();

router.post('/register', [validateSchema(registerSchema)], createUser);
router.post('/login', login);

export default router