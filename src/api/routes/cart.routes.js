const express = require('express');
const {
  createCarrito,
  borrarCarrito,
  todoMiCarrito,
  agregarProductoAlCarrito,
  todosLosCarritos,
  quitarProductoDelCarrito,
} = require('../controllers/cart.controller');
const { isAuth } = require('../../middlewares/auth.middleware');

const CartRoutes = express.Router();

CartRoutes.post('/agregar', createCarrito);
CartRoutes.delete('/:id', isAuth, borrarCarrito);
CartRoutes.get('/:id', isAuth, todoMiCarrito);
CartRoutes.post('/:carritoId', isAuth, agregarProductoAlCarrito);
CartRoutes.patch('/:carritoId', isAuth, quitarProductoDelCarrito);

CartRoutes.get('/', todosLosCarritos);

module.exports = CartRoutes;
