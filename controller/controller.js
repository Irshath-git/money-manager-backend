const model = require("../models/model");
const userModel = require("../models/userModel");

//get categories
// POST :http://localhost:4000/api/categories
async function create_Categories(req, res) {
  const Create = new model.Categories({
    type: "Savings",
    color: "#FCBE44",
  });

  await Create.save(function (err) {
    if (!err) return res.json(Create);
    return res
      .status(400)
      .json({ message: `Error while creating categories${err}` });
  });
}

// GET :http://localhost:4000/api/categories
async function get_Categories(req, res) {
  let data = await model.Categories.find({});
  let filter = await data.map((v) =>
    Object.assign({}, { type: v.type, color: v.color })
  );
  return res.json(filter);
}

// POST :http://localhost:4000/api/transactions
async function create_Transactions(req, res) {
  if (!req.body) {
    return res.status(400).json("Post http Data Not Provided");
  }
  let { name, type, amount } = req.body;

  const create = new model.Transacitons({
    name,
    type,
    amount,
    date: new Date(),
  });

  await create.save(function (err) {
    if (!err) {
      return res.json(create);
    }
    return res
      .status(400)
      .json({ Message: `Error While Creating Transactions ${err}` });
  });
}

// GET :http://localhost:4000/api/transactions
async function get_Transactions(req, res) {
  let data = await model.Transacitons.find({});
  return res.json(data);
}

// DELETE :http://localhost:4000/api/transactions
async function delete_Transactions(req, res) {
  if (!req.body) {
    res.status(400).json({ message: "Request Body Not Found" });
  }
  return await model.Transacitons.deleteOne(req.body, function (err) {
    if (!err) {
      res.json("Record Deleted..!");
    }
  })
    .clone()
    .catch(function (err) {
      res.json("Error while deleting Transaction Recoed");
    });
}

// GET :http://localhost:4000/api/labels
async function get_Labels(req, res) {
  model.Transacitons.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "type",
        foreignField: "type",
        as: "categories_info",
      },
    },
    {
      $unwind: "$categories_info",
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info["color"],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json("Lookup connection Error");
    });
}

//Login User
// POST :http://localhost:4000/api/login
async function login_user(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
}

//Register User
// POST :http://localhost:4000/api/register
async function register_user(req, res) {
  if (!req.body) {
    return res.status(400).json("Post http Data Not Provided");
  }

  let { name, email, password } = req.body;

  const create = new userModel({
    name,
    email,
    password,
    date: new Date(),
  });

  await create.save(function (err) {
    if (!err) {
      return res.json(create);
    }
    return res
      .status(400)
      .json({ Message: `Error While Creating user ${err}` });
  });
}

module.exports = {
  create_Categories,
  get_Categories,
  create_Transactions,
  get_Transactions,
  delete_Transactions,
  get_Labels,
  login_user,
  register_user,
};
