import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/categories`);
    dispatch({
      type: "GET_CATEGORY",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response.data });
  }
};

export const getCategory = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/${id}`);

export const removeCategory = (id, token) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API}/category/${id}`,
      {
        headers: {
          token,
        },
      }
    );
    dispatch({
      type: "REMOVE_CATEGORY",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response.data });
  }
};

export const updateCategory = async (id, category, token) =>
  await axios.put(`${process.env.REACT_APP_API}/category/${id}`, category, {
    headers: {
      token,
    },
  });

export const createCategory = (category, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/category`,
      category,
      {
        headers: {
          token,
        },
      }
    );
    dispatch({
      type: "ADD_CATEGORY",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response.data });
  }
};

export const getCategorySubs = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/category/subs/${id}`);
