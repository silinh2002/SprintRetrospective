const mongoose = require("mongoose");

let columnSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    member_id_array: [require("mongodb").ObjectID],
    is_deleted: Boolean,
    updated_at: Date,
  },
  { versionKey: false }
);

let Column = mongoose.model("Column", columnSchema, "columns");

module.exports = {
  findByLambda: async function (lambda) {
    return await Column.find(lambda);
  },
  createByLambda: async function (lambda) {
    return await Column.insertMany(lambda);
  },
  updateByLambda: async function (id, lambda) {
    return await Column.updateOne(id, lambda);
  },
};
