import { Router } from 'express';
import { createCompany } from '../controller/company.controller.js';
import { isAdmin, isAuth } from "../middleware/authMiddleware.js";
import { addMenu, getMenu } from '../controller/menu.controller.js';
import { companySchema } from '../schema/companySchema.js';
import { menuSchema } from '../schema/menuSchema.js';
import { validateSchema } from '../middleware/validationSchema.js';

const router = Router();


router.post('/company', [validateSchema(companySchema), isAuth, isAdmin], createCompany);


router.post('/menu/:id', [validateSchema(menuSchema), isAuth, isAdmin], addMenu);
router.get('/menu/:id', [isAuth, isAdmin], getMenu);

export default router