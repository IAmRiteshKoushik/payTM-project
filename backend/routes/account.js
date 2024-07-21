const express = require("express");
const mongoose = require("mongoose");
const { authMiddleware } = require("../middleware/middleware");
const { Account } = require("../db");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance: account.balance
    });
});

// Tricky - Database trasactions (for )
router.post("/transfer/bad", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    });
    if(account.balance < amount){
        return res.status(400).json({
            message: "Insufficent balance",
        });
    }
    const toAccount = await Account.findOne({
        userId: to
    });
    if(!toAccount){
        return res.status(400).json({
            message: "Invalid account number",
        });
    }

    // Reduce the amount from sender
    await Account.updateOne(
        {
            userId: req.userId,
        },
        {
            $inc: {
                balance: -amount
            } 
        }
    );

    // Add the amount to the receiver
    await Account.updateOne(
        {
            userId: req.to,
        },
        {
            $inc: {
                balance: amount
            } 
        }
    );

    res.json({
        message: "Transfer successsful"
    })

    // Good solution in an ideal schenario where you server and your 
    // database does not go down at all. Also, there is no concurrnecy.

    // This never happens in real-life
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient funds"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid receiver account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount }}).session(session);
    await Account.updateOne({ userId: req.to }, { $inc: { balance: amount }}).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    })
})

module.exports = router;