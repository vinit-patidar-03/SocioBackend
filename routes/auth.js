const express = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_secret = 'instagram2.o'
const checkUser = require('../middleware/checkUser')
const { body, validationResult } = require('express-validator');
const router = express.Router();


//SignUp endpoint
router.post('/signup', [body('name', 'enter valid name').isLength({ min: 3 }), body('email', 'enter valid email').isEmail(), body('password', 'enter valid password').isLength({ min: 5 }), body('confirm_password', 'enter valid password').isLength({ min: 5 })], async (req, res) => {

    //extracting user data came into req
    const { name, email, password, confirm_password } = req.body;


    //Creating User by some validations and Mongoose User Schema.
    try {
        //checking result of applied validations.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({ success: false, msg: 'user with this email already exists' })
        }

        if (password !== confirm_password) {
            return res.status(422).json({ success: false, msg: 'enter valid confirm password' });
        }

        //Password security
        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Adding data to database
        user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        //Token issue based on Id
        const data = {
            user: {
                id: user.id,
                name: user.name,
            }
        }

        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        res.status(200).json({ success: true, authToken });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})


//login endpoint
router.post('/login', [body('email', 'enter valid email').isEmail(), body('password', "password can't be blank").exists()], async (req, res) => {
    const { email, password } = req.body;

    try {
        //checking validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ success: false, errors: errors.array() })
        }

        //checking user if it exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ success: false, msg: "user doesn't exist" });
        }

        const dbPassword = user.password;
        const comResult = await bcrypt.compare(password, dbPassword);
        if (!comResult) {
            return res.status(422).send({ msg: 'please enter valid creadentials' });
        }

        const data = {
            user: {
                id: user.id,
                name: user.name,
            }
        }
        const authToken = jwt.sign(data, jwt_secret);
        res.status(200).send({ success: true, authToken });
    } catch (error) {
        res.status(500).send({ msg: 'Internal Server Error' });
    }
})

//For getting user Details
router.get('/getUser', checkUser, async (req, res) => {
    try {
        const UserId = req.user.id;
        let user = await User.findById(UserId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error);
    }
})

//other users
router.get('/getuser/:id',async (req,res)=>{
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.log(error);
    }
})


//Follow other Users 
router.put('/follow/:id', checkUser, async (req, res) => {
    try {
        await User.findById(req.params.id, { $push: { followers: req.user.id } });
        res.status(201).send({ success: true, msg: "followed successfully" });
    } catch (error) {
        res.status(404).send({ success: false, msg: "some error occurred" });
    }
})

//Edit profile
router.put('/editProfile',checkUser,async (req,res)=>
{
    try {
        const {bio, avatar} = req.body;
        await User.findByIdAndUpdate(req.user.id,{$set: {bio: bio, avatar: avatar}});
        res.status(200).send({success: true, msg:"updated successfully"});
    } catch (error) {
        res.status(401).send({success: false, msg: "some error occured"});
    }
})

module.exports = router;