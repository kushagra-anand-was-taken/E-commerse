import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import { useSelector, useDispatch } from "react-redux";

const SubList = () => {
  const dispatch = useDispatch();
  // const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    sub: { subs },
  } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // setLoading(true);
    // getSubs().then((res) => {
    //   setSubs(res.data);
    //   setLoading(false);
    // });
    dispatch(getSubs());
  }, []);

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/sub/${s._id}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {loading ? <h4 className="text-center">Loading...</h4> : showSubs()}
      </div>
    </div>
  );
};

export default SubList;
