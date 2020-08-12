const fs = require('fs');
const path = require('path');
const filePath = path.join(path.dirname('data'), 'data/cart.json');

module.exports = class Cart {
  static addItem(newItem) {
    const { id, type, unit_price } = newItem;
    
    fs.readFile(filePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if(!err) {
        cart = JSON.parse(fileContent);
      }

      let existingItemIdx;

      if(type === 'seating') {
        existingItemIdx = cart.products.findIndex(item => item.seat_type === newItem.seat_type);
      } else {
        existingItemIdx = cart.products.findIndex(item => item.id === id);
      }

      const existingItem = cart.products[existingItemIdx];
      let updatedItem;

      if(existingItem) {
        updatedItem = { ...existingItem };
        updatedItem.qty += 1;
        if(updatedItem.type === 'seating') {
          updatedItem.id += `-${id}`;
        }
        cart.products[existingItemIdx] = updatedItem;
      } else {
        updatedItem = { ...newItem, qty: 1 };
        cart.products = [...cart.products, updatedItem];
      }
      cart.totalPrice += +unit_price;
      fs.writeFile(filePath, JSON.stringify(cart, null, 2), err => console.log(err));
    })
  }

  static getItems(cb) {
    fs.readFile(filePath, (err, fileContent) => {
      if(err) {
        cb({ msg: 'empty' });
      } else {
        cb(JSON.parse(fileContent));
      }
    })
  }

  static deleteItem(id) {
    fs.readFile(filePath, (err, fileContent) => {
      if(err) {
        return;
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const foundItem = updatedCart.products.find(item => item.id.includes(id));
      
      if(foundItem) {
        updatedCart.products.map(item => {
          if(item.id.includes(id)) {
            if(id.split('-').length === 1) {
              item.id = item.id.split('-').filter(itemId => itemId !== id).join('-');
              --item.qty;
            } else {
              item.qty = 0;
            }
          }
        });
        updatedCart.products = updatedCart.products.filter(item => item.qty !== 0);
        updatedCart.totalPrice -= foundItem.unit_price * id.split('-').length;
        if(updatedCart.totalPrice <= 0) {
          updatedCart.totalPrice = 0;
        }
        fs.writeFile(filePath, JSON.stringify(updatedCart, null, 2), err => console.log(err));
      }
    })
  }
}
