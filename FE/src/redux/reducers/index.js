import { combineReducers } from 'redux';
import Product from './ProductReducer';
import Cart from './CartReducer';
import Purchase from './PurchaseReducer';
import Type from './TypeReducer';
import Category from './CategoryReducer';
import Order from './OrderReducer';
import User from './UserReducer';
export default combineReducers({
  Product,
  Cart,
  Purchase,
  Type,
  Order,
  Category,
  User,
});
