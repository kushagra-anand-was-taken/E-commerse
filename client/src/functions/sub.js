import axios from "axios";

export const getSubs = () => async (dispatch) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API}/subs`);
    dispatch({
      type: "GET_SUB",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response.data });
  }
};

export const getSub = async (id) =>
  await axios.get(`${process.env.REACT_APP_API}/sub/${id}`);

export const removeSub = (id, token) => async (dispatch) => {
  try {
    const res = await axios.delete(`${process.env.REACT_APP_API}/sub/${id}`, {
      headers: {
        token,
      },
    });
    dispatch({
      type: "REMOVE_SUB",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response.data });
  }
};

export const updateSub = async (id, sub, token) =>
  await axios.put(`${process.env.REACT_APP_API}/sub/${id}`, sub, {
    headers: {
      token,
    },
  });

export const createSub = (name, parent, token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/sub`,
      { name, parent },
      {
        headers: {
          token,
        },
      }
    );
    dispatch({
      type: "ADD_SUB",
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response.data });
  }
};
