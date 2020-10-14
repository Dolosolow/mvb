import { Router } from 'express';
import * as moviesController from '@src/controllers/movies.controller';

const router = Router();

router.get('/', moviesController.getAdminDash);

export default router;

