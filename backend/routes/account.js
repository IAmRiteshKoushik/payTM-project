const express = require("express");
const { authMiddleware } = require("../middleware/middleware");

export const router = express.Router();

router.get("/balance", authMiddleware, );
router.post("/transfer", authMiddleware, );

// Tricky - Database trasactions (for )
// router.post("/transfer/bad", authMiddleware, async (req, res) => {
//     const { amount, to } = req.body;
//
//     const account = await Account.findOne({
//         userId: req.userId
//     });
//     if(account.balance < amount){
//         return res.status(400).json({
//             message: "Insufficent balance",
//         });
//     }
//     const toAccount = await Account.findOne({
//         userId: to
//     });
//     if(!toAccount){
//         return res.status(400).json({
//             message: "Invalid account number",
//         });
//     }
//
//     // Reduce the amount from sender
//     await Account.updateOne(
//         {
//             userId: req.userId,
//         },
//         {
//             $inc: {
//                 balance: -amount
//             } 
//         }
//     );
//
//     // Add the amount to the receiver
//     await Account.updateOne(
//         {
//             userId: req.to,
//         },
//         {
//             $inc: {
//                 balance: amount
//             } 
//         }
//     );
//
//     res.json({
//         message: "Transfer successsful"
//     })
//
//     // Good solution in an ideal schenario where you server and your 
//     // database does not go down at all. Also, there is no concurrnecy.
//
//     // This never happens in real-life
// });
