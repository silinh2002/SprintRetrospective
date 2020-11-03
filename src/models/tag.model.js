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
  createByLambda: async function (lambda) {
    return await Tag.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Tag.updateOne(id, lambda);
  },
};
