export const coupon = (state = false, action) => {
  switch (action.type) {
    case "COUPON_APPLIED":
      return action.payload;
    default:
      return state;
  }
};
