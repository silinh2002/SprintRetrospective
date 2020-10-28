let board = require("../models/board.models");
const resSuccess = require("../response/res-success");

module.exports = {
  listBoard: async function (req, res, next) {
    let data = await board.findByLambda();
    res.json(resSuccess({ data: data }));
  },

  findById: async function (req, res) {
    let id = req.params.id;
    let data = await board.findByLambda({ _id: id });
    res.json(resSuccess({ data: data[0] }));
  },
};
