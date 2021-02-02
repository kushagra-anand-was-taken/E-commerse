const admin = require("../firebase/index");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  // console.log(req.headers); // token
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.token);
    // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  try {
    const adminUser = await User.findOne({ email }).exec();
    // console.log(adminUser);
    if (adminUser.role == "admin") {
      next();
    }
  } catch (error) {
    // console.log(error);
    res.status(403).json({
      error: "Admin resource. Access denied.",
    });
  }

  // const adminUser = await User.findOne({ email }).exec();

  // if (adminUser.role !== "admin") {
  //   res.status(403).json({
  //     err: "Admin resource. Access denied.",
  //   });
  // } else {
  //   next();
  // }
};
