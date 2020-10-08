const router = require('express').Router();
const cartController = require('../../controllers/api/cart.controller');

router.delete('/:id', cartController.deleteCartItem);

router.get('/', cartController.getCart);

router.post('/', cartController.postCart);


module.exports = router;