const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        cantidad: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: false,
  }
);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
