const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Feel free to add things like minimum number of characters, maximum number of characters
// mandatory special characters and numbers etc.
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string(),
});

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);
    if (!success){
        return res.json({
            message: "Incorrect inputs",
        });
    }

    const user = User.findOne({
        username: body.username
    })
    if(user._id){
        return res.json({
            message: "Email already taken",
        });
    }

    const dbUser = await User.create(body);
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);
    res.status(200).json({
        message: "New user created",
        token: token,
    });
})
router.post("/login")

module.exports = router;