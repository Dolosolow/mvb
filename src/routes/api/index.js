import { Router } from 'express';
import cartRoute from './cart';
import movieRoute from './movie';

const router = Router();

router.use('/cart', cartRoute);
router.use('/movies', movieRoute);

export default router;