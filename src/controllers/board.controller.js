let board = require("../models/board.model");
const resSuccess = require("../response/res-success");
const resFail = require("../response/res-fail");
const { omitBy, isNil } = require("lodash");
const moment = require("moment");
const mongodb = require("mongodb");

module.exports = {
  listBoard: async function (req, res, next) {
    let data = await board.findByLambda_Detail();
    res.json(resSuccess({ data: data }));
  },

  findById: async function (req, res) {
    try {
      let id = req.params.id;
      let data = await board.findByLambda_Detail({
        _id: mongodb.ObjectID(id),
      });
      res.json(resSuccess({ data: data[0] }));
    } catch (error) {
      console.log("error.message: " + error.message);
      data = {
        message: error.message,
      };
      res.json(resFail({ data: data }));
    }
  },

  postCreate: async function (req, res, next) {
    try {
      let entity = {
        name: req.body.name || "",
        column_id_array: req.body.column_id_array || [],
        updated_at: moment().now(),
        isDeleted: false,
      };
      let result = await board.createByLambda(entity);
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
        name: req.body.name || "",
        column_id_array: req.body.column_id_array || [],
        updated_at: moment().now(),
        isDeleted: false,
      };

      let entityLast = omitBy(entity, isNil);

      let result = await board.updateByLambda({ _id: id }, entityLast);
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
      let result = await board.updateByLambda({ _id: id }, entity);
      res.json(resSuccess({ data: result }));
    } catch (error) {
      data = {
        message: error.message,
      };
      res.json(resFail({ data: data }));
    }
  },
};
