const Product = require('../models/product.model');
const setError = require('../../helpers/handle-error');

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    if (allProducts) {
      return res.status(404).json(allProducts);
    } else {
      return res.status(200).json('No hay');
    }
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'No hay conexión con base de datos'
      )
    );
  }
};

// RECIBIR UN UNICO PRODUCTO
const getOneProduct = async (req, res, next) => {
  try {
    const productoSolicitado = await Product.findById(req.params.id);
    return res.status(404).json(productoSolicitado);
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'No hay conexión con base de datos'
      )
    );
  }
};
// METER PRODUCTOS
const postOneProduct = async (req, res, next) => {
  try {
    const nuevoProducto = new Product(req.body);
    console.log(nuevoProducto);
    const guardadoProducto = await nuevoProducto.save();
    res.status(200).json(guardadoProducto);
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'No hay conexión con base de datos'
      )
    );
  }
};

//ACTUALIZAR PRODUCTO
const updateOneProduct = async (req, res, next) => {
  try {
    const actualizadoProducto = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(actualizadoProducto);
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'No hay conexión con base de datos'
      )
    );
  }
};

//BORRAR PRODUCTOS
const deleteOneProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Producto borrado');
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'No hay conexión con base de datos'
      )
    );
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  postOneProduct,
  updateOneProduct,
  deleteOneProduct,
};
