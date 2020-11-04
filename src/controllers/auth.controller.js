var User = require("../models/user.model");
var md5 = require("md5");
const resSuccess = require("../response/res-success");
const resFail = require("../response/res-fail");
const moment = require("moment");

module.exports = {
  login: function (req, res) {
    res.send("Form login");
  },
  postLogin: async function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = await User.findByLambda({ email: email });
    if (user.length == 0 || user[0].isDeleted == true) {
      data = {
        message: "User is not exist",
      };
      res.json(resFail({ data: data }));
      return;
    }
    var hashPassword = md5(password);
    if (user[0].password !== hashPassword) {
      data = {
        message: "Wrong password",
      };
      res.json(resFail({ data: data }));
      return;
    }

    res.cookie("userId", user[0]._id, {
      signed: true,
    });
    res.json(resSuccess({ data: user[0] }));
  },

  postRegister: async function (req, res, next) {
    try {
      let pw = md5(req.body.password);
      let entity = {
        phone: req.body.phone || undefined,
        name: req.body.name || undefined,
        email: req.body.email || undefined,
        password: pw || undefined,
        avatar: req.body.avatar || undefined,
        updated_at: moment().now,
        isDeleted: false,
      };
      let result = await User.createByLambda(entity);
      res.json(resSuccess({ data: result }));
    } catch (error) {
      data = {
        message: error.message,
      };
      res.json(resFail({ data: data }));
    }
  },

  postSignOut: async function (req, res) {
    res.cookie(
      "userId",
      "",
      {
        signed: true,
      },
      { maxAge: 0 }
    );

    data = {
      message: "Successfully clear cookie",
    };
    res.json(resSuccess({ data: data }));
  },
};
