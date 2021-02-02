import { combineReducers } from "redux";
import { user } from "./user";
import category from "./category";
import sub from "./sub";
import search from "./search";
import { cart } from "./cart";
import { drawer } from "./drawer";
import { coupon } from "./coupon";
import { COD } from "./cod";

export default combineReducers({
  user,
  category,
  sub,
  search,
  cart,
  drawer,
  coupon,
  COD,
});
