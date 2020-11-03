var User = require("../models/user.model");
const resFail = require("../response/res-fail");
module.exports = {
  requireAuth: async function (req, res, next) {
    // console.log("typeof cookie: " + typeof req.signedCookies.userId);
    // console.log(" cookie: " + req.signedCookies.userId);
    if (!req.signedCookies.userId) {
      data = {
        message: "You need to login",
      };
      res.json(resFail({ data: data }));
      return;
    }

    var user = await User.findByLambda({ _id: req.signedCookies.userId });
    if (!user) {
      data = {
        message: "You need to login",
      };
      res.json(resFail({ data: data }));
      return;
    }
    // console.log(user[0]);

    // res.locals.user = user[0];
    // console.log(res.locals.user);
    req.user = user[0];
    next();
  },
};
