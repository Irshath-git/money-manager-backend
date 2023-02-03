const express = require("express");
const router = new express.Router();
const controller = require("../controller/controller");

router
  .route("/api/categories")
  .post(controller.create_Categories)
  .get(controller.get_Categories);

router
  .route("/api/Transactions")
  .post(controller.create_Transactions)
  .get(controller.get_Transactions)
  .delete(controller.delete_Transactions);

router.route("/api/labels").get(controller.get_Labels);

router.route("/api/login").post(controller.login_user);
router.route("/api/register").post(controller.register_user);

module.exports = router;
