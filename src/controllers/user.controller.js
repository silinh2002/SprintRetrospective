let user = require("../models/user.model");
const resSuccess = require("../response/res-success");
const resFail = require("../response/res-fail");
const { omitBy, isNil } = require("lodash");
const moment = require("moment");

module.exports = {
  listUser: async function (req, res, next) {
    let data = await user.findByLambda();
    res.json(resSuccess({ data: data }));
  },

  findById: async function (req, res) {
    let id = req.params.id;
    let data = await user.findByLambda({ _id: id });
    res.json(resSuccess({ data: data[0] }));
  },

  postCreate: async function (req, res, next) {
    try {
      let entity = {
        phone: req.body.phone || "",
        name: req.body.name || "",
        email: req.body.email || "",
        password: req.body.password || "",
        avatar: req.body.avatar || "",
        updated_at: moment().now(),
        isDeleted: false,
      };
      let result = await user.createByLambda(entity);
      res.json(resSuccess({ data: result }));
    } catch (error) {
      data = {
        message: error.message,
      };
      res.json(resFail({ data: data }));
    }
  },

  patchUpdate: async function (req, res, next) {
    try {
      let id = req.params.id;
      let entity = {
        phone: req.body.phone || "",
        name: req.body.name || "",
        email: req.body.email || "",
        password: req.body.password || "",
        avatar: req.body.avatar || "",
        updated_at: moment().now(),
        isDeleted: false,
      };

      let entityLast = omitBy(entity, isNil);

      let result = await user.updateByLambda({ _id: id }, entityLast);
      res.json(resSuccess({ data: result }));
    } catch (error) {
      data = {
        message: error.message,
      };
      res.json(resFail({ data: data }));
    }
  },

  delete: async function (req, res) {
    try {
      let id = req.params.id;
      let entity = {
        isDeleted: true,
      };
      let result = await user.updateByLambda({ _id: id }, entity);
      res.json(resSuccess({ data: result }));
    } catch (error) {
      data = {
        message: error.message,
      };
      res.json(resFail({ data: data }));
    }
  },
};
