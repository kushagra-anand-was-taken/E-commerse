import axios from "axios";

export const createOrUpdateUser = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/CreateOrUpdateUser`,
    {},
    {
      headers: {
        token,
      },
    }
  );
};

export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/currentUser`,
      {},
      {
        headers: {
          token,
        },
      }
    );
    dispatch({
      type: "LOGGED_IN_USER",
      payload: {
        name: res.data.name,
        email: res.data.email,
        token: token,
        role: res.data.role,
        _id: res.data._id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const currentAdmin = (token) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/currentAdmin`,
      {},
      {
        headers: {
          token,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};
