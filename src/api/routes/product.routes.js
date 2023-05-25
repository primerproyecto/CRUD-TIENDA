const express = require('express');
const { upload } = require('../../middlewares/files.middleware');
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
ProductRoutes.post('/new', postOneProduct);
ProductRoutes.put('/:id', updateOneProduct);
ProductRoutes.delete('/:id', deleteOneProduct);

/* ProductRoutes.post('/check', checkNewUser);
ProductRoutes.post('/resend', resendCode);
ProductRoutes.post('/login', login);
ProductRoutes.get('/forgotpassword', forgotPassword);
ProductRoutes.patch('/changepassword', [isAuth], modifyPassword);
ProductRoutes.patch('/update/update', [isAuth], upload.single('image'), update);
ProductRoutes.delete('/', [isAuth], deleteUser); */

//! -------REDIRECT --------------------

/* ProductRoutes.get('/forgotpassword/sendPassword/:id', sendPassword); */

module.exports = ProductRoutes;
