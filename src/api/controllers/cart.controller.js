const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const setError = require('../../helpers/handle-error');

// CREAR CARRITO
/** PARA CREAR UN CARRITO SE NECESITA, A PARTE DE UN POQUITO DE GRACIA, UN userId UN ARRAY DE PRODUCTO  POR EL REQ.BODY  */
const createCarrito = async (req, res, next) => {
  try {
    /** COMPROBAR QUE NO HAYA YA UN CARRITO CON EL MISMO ID */
    /* const estaYaCreado = await Cart.find({ userId: req.body.userId });
    if (estaYaCreado) {
      res.json(`Ya existe un carrito con el userId ${req.body.userId}`);
    } else {
      const nuevoCarrito = new Cart(req.body);
      const creadoCarrito = await nuevoCarrito.save();

      res.status(200).json(creadoCarrito);
    } */
    const nuevoCarrito = new Cart(req.body);
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
// OTRA FORMA DE AGREGAR UN PRODUCTO A UN CARRITO SIN EL METODO FINDBYIDANDUPADATE DE MONGOOSE. A TRAVES DEL MODELO USER
const agregarACarrito = async (req, res, next) => {
  try {
    const usuario = await User.findById(req.body.usuario);

    usuario.carrito.push(req.params.producto);
    try {
      const carritoActualizado = await usuario.save();

      res.status(200).json(carritoActualizado);
    } catch (error) {
      return next(
        setError(
          error.code || 500,
          error.message ||
            'No se puede establecer conexión con nuestra base de datos'
        )
      );
    }
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
    const usuario = await Cart.findById(req.params.id).populate('products');
    console.log(usuario);

    res.status(200).json(usuario);
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
//BORRAR UN CARRITO COMLETAMENTE
const borrarCarrito = async (req, res, next) => {
  try {
    const carritoId = req.body.carritoId;

    const carritoDeUsuarioActualizado = await Cart.findOneAndDelete(carritoId);

    if (!carritoDeUsuarioActualizado) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
    res.status(200).json('Carrito borrado con éxito');
  } catch (error) {
    return next(
      setError(
        error.code || 500,
        error.message || 'No se pudo borrar producto del carrito'
      )
    );
  }
};

/* AGREGAR UN DETERMINADO PRODUCTO DE UN DETERMINADO CARRITO
SE PASA POR BODY EL productId y por PARAMS el carritoId
*/
const agregarProductoAlCarrito = async (req, res) => {
  try {
    const carritoId = req.params.carritoId;
    const productoId = req.body.products[0].productId;

    const karrito = await Cart.findById(carritoId);
    //SI TIENE EL PRODUCTO QUE LE MANDO LE SUMO UNO A LA CANTIDAD
    karrito.products?.map((product) => {
      if (product.productId.toString() == productoId) {
        product.cantidad = product.cantidad + 1;
      }
    });
    //VUELVO A COMPROBAR SI YA ESTA AÑADIDO Y SI NO LO ESTA LO AÑADIMOS CON UN PUSH
    const existeProducto = karrito.products.some(
      (product) => product.productId.toString() == productoId
    );
    if (!existeProducto) {
      karrito.products.push({
        productId: productoId,
        cantidad: 1,
      });
    }

    await karrito.save();
    res.status(200).json(karrito);

    /* res.json(karrito); */
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al agregar producto al carrito', error });
  }
};

/* MOSTAR TODOS LOS CARRITOS ...PARA DESARROYO*/
const todosLosCarritos = async (req, res) => {
  try {
    const todosLosCarritos = await Cart.find().populate('products');

    if (!todosLosCarritos) {
      return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }

    res.status(400).json(todosLosCarritos);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al agregar producto al carrito', error });
  }
};

/* BORRAR UN DETERMINADO PRODUCTO DE UN DETERMINADO CARRITO
SE PASA POR BODY EL productId y por PARAMS el carritoId
*/
const quitarProductoDelCarrito = async (req, res) => {
  try {
    const carritoId = req.params.carritoId;
    const productoId = req.body.productId;

    const karrito = await Cart.findById(carritoId);
    //SI TIENE EL PRODUCTO QUE LE MANDO LE SUMO UNO A LA CANTIDAD
    karrito.products?.map((product) => {
      if (product.productId.toString() == productoId) {
        if (product.cantidad > 1) {
          product.cantidad = product.cantidad - 1;
        } else {
          const existeProducto = karrito.products.filter(
            (product) => product.productId.toString() !== productoId
          );
          karrito.products = existeProducto;
        }
      }
    });
    await karrito.save();

    res.status(200).json({
      karrito,
      message: 'La operación de borrado se ha realizado con éxito',
    });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: 'Error al quitar producto al carrito', error });
  }
};

module.exports = {
  createCarrito,
  agregarACarrito,
  borrarCarrito,
  todoMiCarrito,
  agregarProductoAlCarrito,
  todosLosCarritos,
  quitarProductoDelCarrito,
};
