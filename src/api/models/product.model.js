const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String },
    categories: { type: String, enum: ['Electrónico', 'Complementos'] },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
