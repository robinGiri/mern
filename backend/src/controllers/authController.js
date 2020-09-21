const User = require("../models/userModuel");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user) {
      return res.status(200).json({
        message: "User already exixts",
      });
    }

    const { firstName, lastName, email, hash_password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      userName: Math.random().toString(),
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went worng while making user",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "User created successfully ..!",
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) {
      return res.status(400).json({
        message: "error",
      });
    }
    if (user) {
      if (user.authencate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went worng..!",
      });
    }
  });
};

exports.requireSignin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

exports.categoryCreateUserAccess = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "Access denied login as user to create." });
  }
  next();
};

exports.categoryCerateAccess = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ message: "Access denied login as admin to create." });
  }
  next();
};
