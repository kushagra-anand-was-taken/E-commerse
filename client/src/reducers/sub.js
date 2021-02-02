const initialState = {
  subs: [],
  sub: null,
  loading: true,
  error: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_SUB":
      return {
        ...state,
        sub: payload,
        subs: [payload, ...state.subs],
        loading: false,
        error: false,
      };
    case "REMOVE_SUB":
      return {
        ...state,
        subs: state.subs.filter((q) => q._id !== payload._id),
      };

    case "GET_SUB":
      return { ...state, subs: payload, loading: false, error: false };
    case "ERROR":
      return { ...state, error: true };
    default:
      return state;
  }
}
