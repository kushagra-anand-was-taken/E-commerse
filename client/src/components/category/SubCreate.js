import React, { useState, useEffect } from "react";
import AdminNav from "../user/AdminNav";
// import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../functions/category";
import { getSubs, createSub, removeSub } from "../../functions/sub";
import LocalSearch from "../LocalSearch";

const SubCreate = () => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const {
    category: { categories },
  } = useSelector((state) => ({ ...state }));
  const {
    sub: { subs },
  } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubs());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSub(name, category, user.token));
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

  const handleRemove = (id) => {
    dispatch(removeSub(id, user.token));
  };
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);
  return (
    <div className="container-fluid pt-3">
      <div className="row">
        <div className="col-md-2 ">
          <AdminNav />
        </div>
        <div className="col">
          <h4>Create Sub Category</h4>
          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          {categoryForm()}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {subs.filter(searched(keyword)).map((c) => (
            <div className="alert alert-secondary" key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c._id)}
                className="btn btn-sm float-right"
              >
                <i className="fas fa-trash fa-2x text-danger"></i>
              </span>
              <Link to={`/admin/sub/${c._id}`}>
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

export default SubCreate;
