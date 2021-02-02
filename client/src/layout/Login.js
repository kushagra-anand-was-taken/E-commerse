import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../firebase";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import { createOrUpdateUser } from "../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("kushrokz95@gmail.com");
  const [password, setPassword] = useState("qwerty");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location?.state;
    if (intended) {
      // console.log(intended);
      // console.log("useeefct if ke");
      return;
    } else {
      if (user && user.token) {
        // console.log(intended);
        history.push("/");
      }
      // console.log("useeefct else ke");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      // console.log(" 2 from role ", intended.from);
      history.push(`/${intended.from}`);
      // console.log(" 2 from role ", intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
        // console.log("from role else admin", intended.from);
      } else {
        history.push("/user/history");
        // console.log("from role else user", intended.from);
      }
    }
  };

  // useEffect(() => {
  //   if (user && user.token) history.push("/");
  // }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name
                ? res.data.name
                : user.email && user.email.split("@")[0],
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((error) => console.log(error));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const googleLogin = async (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name
                  ? res.data.name
                  : user.email && user.email.split("@")[0],
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((error) => console.log(error));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const loginForm = () => (
    <form>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter Email"
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
        />
      </div>

      <button
        onClick={handleSubmit}
        type="submit"
        className="btn btn-raised btn-outline-primary"
        disabled={!email}
      >
        Login with Email/Password
      </button>

      <button
        type="submit"
        onClick={googleLogin}
        className="btn btn-raised btn-outline-danger ml-5"
      >
        Login with Google
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Login</h4>
          {loginForm()}

          <Link to="/forgot/password" className="float-right text-danger">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
