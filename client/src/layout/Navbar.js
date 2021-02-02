import React from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import Search from "../components/filter/Search";
// import { Badge } from "antd";

const Navbar = () => {
  let history = useHistory();
  let dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return "active";
    }
    //  else {
    //   return "";
    // }
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    // history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light ">
      <Link className={`navbar-brand ml-5 `} to="/">
        Home
      </Link>
      <Link className={`navbar-brand ml-5 `} to="/shop">
        Shop
      </Link>
      <Link className={`navbar-brand ml-5 `} to="/cart">
        Cart{" "}
        <sup>
          <small className="cart-badge">{cart.length}</small>
        </sup>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse mr-5"
        id="navbarSupportedContent"
      >
        <span className="ml-auto p-1">
          <Search />
        </span>
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${isActive(history, "/login")}`}>
            {!user && (
              <Link className="nav-link " to="/login">
                Login <span className="sr-only">(current)</span>
              </Link>
            )}
          </li>
          <li className={`nav-item ${isActive(history, "/register")}`}>
            {!user && (
              <Link className="nav-link " to="/register">
                Register
              </Link>
            )}
          </li>
          {user && (
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={
                  user.role === "admin" ? "/admin/dashboard" : "/user/history"
                }
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {user.name ? user.name : user.email.split("@")[0]}
              </Link>
              {/* <div> {user.name ? user.name : user.email.split("@")[0]}</div> */}
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  className="dropdown-item"
                  to={
                    user.role === "admin" ? "/admin/dashboard" : "/user/history"
                  }
                >
                  Dashboard
                </Link>
                <Link className="dropdown-item" onClick={logout} to="/login">
                  Logout
                </Link>
                <div className="dropdown-divider"></div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
