const mongoose = require("mongoose");

let boardSchema = new mongoose.Schema(
  {
    name: String,
    column_id_array: [require("mongodb").ObjectID],
    is_deleted: Boolean,
    updated_at: Date,
  },
  { versionKey: false }
);

let Board = mongoose.model("Board", boardSchema, "boards");

module.exports = {
  findByLambda: async function (lambda) {
    lambda = { ...lambda, is_deleted: false };
    return await Board.find(lambda);
  },
  findByLambda_Detail: async function (lambda) {
    console.log("lambda: " + JSON.stringify(lambda));
    if (lambda == undefined) {
      lambda = {};
    }
    lambda = { ...lambda, is_deleted: false };
    return await Board.aggregate([
      {
        $match: lambda,
      },
      {
        $lookup: {
          from: "columns",
          localField: "column_id_array",
          foreignField: "_id",
          as: "columns",
        },
      },
    ]);
  },
  createByLambda: async function (lambda) {
    return await Board.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Board.updateOne(id, lambda);
  },
};
