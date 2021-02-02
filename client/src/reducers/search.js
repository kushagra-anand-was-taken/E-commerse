const initialState = { text: "" };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "SEARCH_QUERY":
      return { ...state, ...payload };

    default:
      return state;
  }
}
