const initialState = {
  categories: [],
  category: null,
  loading: true,
  error: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        category: payload,
        categories: [payload, ...state.categories],
        loading: false,
        error: false,
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((q) => q._id !== payload._id),
      };

    case "GET_CATEGORY":
      return { ...state, categories: payload, loading: false, error: false };
    case "ERROR":
      return { ...state, error: true };
    default:
      return state;
  }
}
