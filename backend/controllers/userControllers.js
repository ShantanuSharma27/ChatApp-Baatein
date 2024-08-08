const User = require('../models/userModel');
const generateToken = require("../config/generateToken");
const expressAsyncHandler = require('express-async-handler');
const { query } = require('express');

const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all the fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        return res.status(400).json({ message: "Something went wrong!" });
    }
});

const authUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        return res.status(401).json({ message: "Invalid Email or Password" });
    }
});

// /api/user?search=piyush
const allUsers=expressAsyncHandler(async(req,res)=>{

    //this is user for matching the name the name which is passed in the query is matched the names in the db regex is used for pattern matching only.
    const keyword=req.query.search ? {
        $or:[{name:{$regex:req.query.search, $options:"i"}},
        {email:{$regex:req.query.search, $options:"i"}}
    ]
    }
    :{};
    //this line means that we have to find all the users except the user which is currently logged in
    const users=await User.find(keyword).find({_id:{$ne:req.user._id}});
    res.send(users);
});
module.exports = { registerUser, authUser,allUsers };
