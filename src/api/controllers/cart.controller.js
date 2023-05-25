const Cart = require('../models/cart.model');
const setError = require('../../helpers/handle-error');

// CREAR CARRITO
const createCarrito = async (req, res, next) => {
  try {
    const nuevoCarrito = new Cart(req.body);
    console.log(nuevoCarrito);
    const creadoCarrito = await nuevoCarrito.save();
    res.status(200).json(creadoCarrito);
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message ||
          'No se puede establecer conexión con nuestra base de datos'
      )
    );
  }
};

//MANDAR EL CARRITO DE UN USUARIO
const todoMiCarrito = async (req, res, next) => {
  try {
    const carrito = await Cart.find({ userId: req.params.id });
    res.status(200).json(carrito);
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message ||
          'No se puede establecer conexión con nuestra base de datos'
      )
    );
  }
};
//BORRAR PRODUCTOS DEL CARRITO
const borrarProductoCarrito = async (req, res, next) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json('Producto eliminado del carrito');
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'No se pudo borrar producto del carrito'
      )
    );
  }
};

module.exports = {
  createCarrito,
  borrarProductoCarrito,
  todoMiCarrito,
};
