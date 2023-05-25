const express = require('express');
const {
  createCarrito,
  borrarProductoCarrito,
  todoMiCarrito,
} = require('../controllers/cart.controller');
const { isAuth } = require('../../middlewares/auth.middleware');

const CartRoutes = express.Router();

CartRoutes.post('/agregar', isAuth, createCarrito);
CartRoutes.delete('/:id', isAuth, borrarProductoCarrito);
CartRoutes.get('/:id', isAuth, todoMiCarrito);

module.exports = CartRoutes;
