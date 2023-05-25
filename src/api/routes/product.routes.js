const express = require('express');
const {
  getAllProducts,
  getOneProduct,
  postOneProduct,
  updateOneProduct,
  deleteOneProduct,
} = require('../controllers/product.controller');
const { isAuth } = require('../../middlewares/auth.middleware');

const ProductRoutes = express.Router();

ProductRoutes.get('/getAllProducts', getAllProducts);
ProductRoutes.get('/:id', getOneProduct);
ProductRoutes.post('/new', isAuth, postOneProduct);
ProductRoutes.put('/:id', isAuth, updateOneProduct);
ProductRoutes.delete('/:id', isAuth, deleteOneProduct);

module.exports = ProductRoutes;
