import { Router } from 'express';
import authRoute from './auth';
import cartRoute from './cart';
import movieRoute from './movie';

const router = Router();

router.use('/auth', authRoute);
router.use('/cart', cartRoute);
router.use('/movies', movieRoute);

export default router;