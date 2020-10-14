import { Router } from 'express';
import * as cartController from '@src/controllers/api/cart.controller';

const router = Router();

router.delete('/:id', cartController.deleteCartItem);
router.get('/', cartController.getCart);
router.post('/', cartController.postCart);


export default router;