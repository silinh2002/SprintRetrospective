var User = require("../models/user.model");
var md5 = require("md5");
const resSuccess = require("../response/res-success");
const resFail = require("../response/res-fail");

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
};
