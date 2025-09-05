const express = require("express");
const Router = express.Router();
const razorpayInstance = require("../utils/razorpay");
const { userAuth } = require("../middlewares/auth");
const Payment = require("../models/payment");
const { membershipAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

Router.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { membershipType } = req.body;
    const { firstName, lastName, emailId } = req.user;
    console.log(membershipType);
    const order = await razorpayInstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: `receipt_order_${Math.random() * 100}`,
      notes: {
        firstName: firstName,
        lastName: lastName,
        email: emailId,
        membershipType: membershipType,
      },
    });
    console.log(order);
    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      notes: order.notes,
    });
    const savedPayment = await payment.save();
    res
      .status(200)
      .json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    if (!isWebhookValid) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const paymentDetails = req.body.payload.payment.entity;
    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();
    res.status(200).json({ message: "Payment processed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

Router.get("/premium/verify", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (user.isPremium) {
      return res
        .status(200)
        .json({ isPremium: true, membershipType: user.membershipType });
    }
    res.status(200).json({ isPremium: false });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = Router;
