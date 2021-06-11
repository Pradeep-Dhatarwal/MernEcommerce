const router = require("express").Router();
const paymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middlewares/auth");
// const authAdmin = require("../middlewares/authAdmin");

router
	.route("/payment")
	.get(auth, paymentCtrl.getPayments)
	.post(auth, paymentCtrl.createPayment);

module.exports = router;
