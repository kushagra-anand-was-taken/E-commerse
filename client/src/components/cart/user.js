import axios from "axios";

export const userCart = async (cart, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        token,
      },
    }
  );

export const getUserCart = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      token,
    },
  });

export const emptyUserCart = async (token) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      token,
    },
  });

export const saveUserAddress = async (token, address) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        token,
      },
    }
  );

export const applyCoupon = async (token, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        token,
      },
    }
  );

export const createOrder = async (stripeResponse, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        token,
      },
    }
  );

export const getUserOrders = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      token,
    },
  });

export const getWishlist = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`, {
    headers: {
      token,
    },
  });

export const removeWishlist = async (productId, token) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        token,
      },
    }
  );

export const addToWishlist = async (productId, token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        token,
      },
    }
  );

export const createCashOrderForUser = async (token, COD, couponTrueOrFalse) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        token,
      },
    }
  );
