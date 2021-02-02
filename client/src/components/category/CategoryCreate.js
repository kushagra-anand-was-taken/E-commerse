import React, { useState, useEffect } from "react";
import AdminNav from "../user/AdminNav";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../functions/category";
import LocalSearch from "../LocalSearch";

const CategoryCreate = () => {
  const [keyword, setKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const {
    category: { categories },
  } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeCategory(id, user.token));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createCategory({ name }, user.token));
    // setTimeout(function () {
    //   error
    //     ? toast.error("Some error happened")
    //     : toast.success(`New Category is created`);
    //   setName("");
    // }, 2000);
    // error
    //   ? toast.error("Some error happened")
    //   : toast.success(`New Category is created`);
    setName("");
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-md-2 ">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Create category</h4>
          {categoryForm()}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          <hr />
          {categories.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c._id)}
                className="btn btn-sm float-right"
              >
                <i className="fas fa-trash fa-2x text-danger"></i>
              </span>
              <Link to={`/admin/category/${c._id}`}>
                <span className="btn btn-sm float-right">
                  <i className="fas fa-edit fa-2x text-warning"></i>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
