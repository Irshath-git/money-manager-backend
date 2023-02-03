const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//categories
const categories_model = new Schema({
  type: { type: String, default: "Savings" },
  color: { type: String, default: "#f9c74f" },
});

//transacitons
const transacitons_model = new Schema({
  name: { type: String, default: "Anonymous" },
  type: { type: String, default: "savings" },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

const Categories = mongoose.model("categories", categories_model);
const Transacitons = mongoose.model("transacitons", transacitons_model);

exports.default = Transacitons;
module.exports = {
  Categories,
  Transacitons,
};
