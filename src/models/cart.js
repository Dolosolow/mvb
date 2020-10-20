import moment from 'moment';
import mongoose from 'mongoose';
import { dateFormat } from '@src/utils/lib/time';

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String },
  totalPrice: { type: Number, default: 0, required: true },
  items: [{
    _id: false,
    screenId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screen' },
    itemId: { type: String },
    type: { type: String },
    seat_type: { type: String },
    unit_price: { type: String },
    qty: { type: Number, default: 0 }
  }],
  date_created: {
    type: String,
    default: moment().format(dateFormat),
    required: true
  },
  date_updated: {
    type: String,
    default: moment().format(dateFormat),
    required: true
  }
});

cartSchema.statics.addItem = async function(newItem, userId) {
  const foundCart = await this.findOne({ userId });
  let cart, updatedItem;

  if(foundCart) {
    cart = foundCart;
  } else {
    cart = new this({ userId });
  }

  const existingItemIdx = cart.items.findIndex(item => item.seat_type === newItem.seat_type);
  const existingItem = cart.items[existingItemIdx];

  if(existingItem) {
    updatedItem = existingItem;
    updatedItem.qty += 1;
    updatedItem.itemId += `-${newItem.itemId}`;
    
    cart.items[existingItemIdx] = updatedItem;
  } else {
    updatedItem = { ...newItem, qty: 1 };
    cart.items = [...cart.items, updatedItem];
  }
  cart.totalPrice += +newItem.unit_price;

  return cart.save();
}

cartSchema.statics.deleteItem = async function(itemId, userId) {
  const cart = await this.findOne({ userId });
  const selectedItemIdx = cart.items.findIndex(item => item.itemId.includes(itemId));

  if(selectedItemIdx !== -1) {
    let selectedItem = cart.items[selectedItemIdx];

    if(itemId.split('-').length === 1) {
      selectedItem.itemId = selectedItem.itemId.split('-').filter(selectedId => selectedId !== itemId).join('-');
      --selectedItem.qty;
    } else {
      selectedItem.qty = 0;
    }
    cart.items = cart.items.filter(item => item.qty !== 0);
    cart.totalPrice -= selectedItem.unit_price * itemId.split('-').length;

    if(cart.totalPrice < 0) {
      cart.totalPrice = 0;
    }

    return cart.save();
  }
}

cartSchema.statics.clearCart = async function(userId) {
  const cart = await this.findOne({ userId });
  
  cart.items = [];
  cart.totalPrice = 0;

  return cart.save();
}

export default mongoose.model('Cart', cartSchema);