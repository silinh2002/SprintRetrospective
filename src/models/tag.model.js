const mongoose = require("mongoose");

let tagSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    member_id_array: [require("mongodb").ObjectID],
    is_deleted: Boolean,
    updated_at: Date,
  },
  { versionKey: false }
);

let Tag = mongoose.model("Tag", tagSchema, "tags");

module.exports = {
  findByLambda: async function (lambda) {
    return await Tag.find(lambda);
  },
  findByLambda_Detail: async function (lambda) {
    console.log("lambda: " + JSON.stringify(lambda));
    if (lambda == undefined) {
      lambda = {};
    }
    return await Tag.aggregate([
      {
        $match: lambda,
      },
      {
        $lookup: {
          from: "users",
          localField: "member_id_array",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);
  },
  createByLambda: async function (lambda) {
    return await Tag.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Tag.updateOne(id, lambda);
  },
};
