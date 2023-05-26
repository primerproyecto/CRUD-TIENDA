# CRUD TIENDA

Aplicación montada con express js que simula un carrito de la compra.

Para ejecutarla desde la terminal ``npm run dev``


## Models

Los modelos de esta aplicación de mongoose son los siguientes.

1. Modelo de usuario
```
const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, 'Email not valid'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: [validator.isStrongPassword],
      minlength: [8, 'Min 8 characters'],
    },
    rol: { type: String, enum: ['admin', 'user'], required: true },
    image: { type: String },
    confirmationCode: { type: Number, required: true },
    check: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
```
2. Modelo de carrito 

````
const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
````

3. Modelo de producto

```
const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: String, enum: ['Electrónico', 'Complementos'] },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
```


## Endpoints

### Endpoinst de usuario
Un usuario con email y contraseña se podrá registrar en un proceso en el que le llegará un código de confirmación.

1. Registrar la cuenta de un usuario (pública) --> POST --> /register
2. Reenvío del código de confirmación (pública) --> POST --> /check
3. Login en la aplicación (pública) --> POST --> /login
4. Recuperar contraseña (pública) --> GET --> /forgotpassword
5. Cambiar contraseña (privada) --> PATCH --> /changepassword
6. Borrar usuario (privada) --> DELETE --> / 


### Endpoint del carrito
El usario registrado con rol de user, podrá agregar, quitar productos al catálogo general.

1. Agregar (privada) -> POST --> /agregar
2. Quitar (privada)  -> DELETE --> /:id
3. Recibir carrrito de un usuario (privada) --> GET --> /:id

### Endpoint de productos

El usario registrado con rol de admin, podrá agregar, editar y borrar productos al catálogo general.

1. Todos los productos del catálogo (pública) --> GET --> /getAllProducts
2. Recibir un producto del catálogo en concreto (pública) --> GET --> /:id
3. Agregar un producto al catálogo (privada) --> POST --> /new
4. Editar un prodúcto del catálogo (privada) --> PUT --> /:id
5. Borrar un prodcuto del catálogo (privada) --> DELETE --> /:id