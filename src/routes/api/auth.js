import { Router } from 'express';
import * as authController from '@src/controllers/api/auth.controller';

const router = Router();

router.post('/login', authController.postLogin);

router.post('/logout', authController.postlogout);

export default router;