const Product = require('../models/product.model');
const setError = require('../../helpers/handle-error');
const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

// RECIBIR TODOS LOS PRODUCTOS DEL CARRITO
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
// AGREGAR UN PRODUCTO AL CATALOGO DE PRODUCTOS
const postOneProduct = async (req, res, next) => {
  try {
    let catchImg = req.file?.path;
    const nuevoProducto = new Product(req.body);

    if (req.file) {
      nuevoProducto.image = req.file.path;
    } else {
      nuevoProducto.image = 'https://pic.onlinewebfonts.com/svg/img_181369.png';
    }
    const guardadoProducto = await nuevoProducto.save();

    if (guardadoProducto === null) {
      deleteImgCloudinary(catchImg);
    }
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
