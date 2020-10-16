import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '@src/utils/database';
import { dateFormat } from '@src/utils/lib/time';

export default class Cart {
  constructor() {
    this.id = uuidv4();
    this.items = [];
    this.totalPrice = 0;
    this.dateCreated = moment().format(dateFormat);
  }

  save(userId, email) {
    this.email = email;
  }

  async createCart(userId) {
    const db = getDatabase();
    const cart = await db.collection('carts').findOne({ userId });
    
    if(!cart) {
      this.userId = userId;
      await db.collection('carts').insertOne(this);
    }
  }

  static async addItem(newItem, userId) {
    const db = getDatabase();
    const { id, type, unit_price } = newItem;
    let existingItemIdx, updateItem;

    const userCart = await db.collection('carts').findOne({ userId });

    if(type === 'seating') {
      existingItemIdx = userCart.items.findIndex(item => item.seat_type === newItem.seat_type);
    } else {
      existingItemIdx = userCart.items.findIndex(item => item.id === id);
    }

    const existingItem = userCart.items[existingItemIdx];

    if(existingItem) {
      updateItem = { ...existingItem };
      updateItem.qty += 1;
      if(updateItem.type === 'seating') {
        updateItem.id += `-${id}`;
      }
      userCart.items[existingItemIdx] = updateItem;
    } else {
      updateItem = { ...newItem, qty: 1 };
      userCart.items = [...userCart.items, updateItem];
    }

    this.totalPrice += +unit_price;
    await db.collection('carts').updateMany(
      { id: userCart.id }, 
      { $set: { items: userCart.items, totalPrice: userCart.totalPrice += +unit_price } }
    );
  }

  static async getCart(userId) {
    const db = getDatabase();
    const foundCart = await db.collection('carts').findOne({ userId });
    return foundCart;
  }

  static async deleteItem(itemId, userId) {
    const db = getDatabase();
    const userCart = await db.collection('carts').findOne({ userId });
    const foundItemIdx = userCart.items.findIndex(item => item.id.includes(itemId));

    if(foundItemIdx !== -1) {
      let foundItem = userCart.items[foundItemIdx];

      if(itemId.split('-').length === 1) {
        foundItem.id = foundItem.id.split('-').filter(item => item !== itemId).join('-');
        --foundItem.qty;
      } else {
        foundItem.qty = 0;
      }
      userCart.items = userCart.items.filter(item => item.qty !== 0);
      userCart.totalPrice -= foundItem.unit_price * itemId.split('-').length;
      
      if(userCart.totalPrice < 0) {
        userCart.totalPrice = 0;
      }

      await db.collection('carts').updateOne(
        { userId }, 
        { $set: { items: userCart.items, totalPrice: userCart.totalPrice } }
      );
    }
  }
}