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

    //checking result of applied validations.
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    //Creating User by some validations and Mongoose User Schema.
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(422).json({ success, msg: 'user with this email already exists' })
        }

        if (password !== confirm_password) {
            return res.status(422).json({ success, msg: 'enter valid confirm password' });
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
          user:{
                id: user.id,
                name: user.name
            }
        }

        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        res.status(200).json({ success, authToken });

    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
})


//login endpoint
router.post('/login', [body('email', 'enter valid email').isEmail(), body('password', "password can't be blank").exists()], async (req, res) => {
    let success = false;
    const { email, password } = req.body;
     
    //checking validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ success, errors: errors.array() })
    }

    try {

        //checking user if it exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send({ success, message: "user doesn't exist" });
        }

        const dbPassword = user.password;
        const comResult = await bcrypt.compare(password, dbPassword);

        if (!comResult) {
            return res.status(422).send({ message: 'please enter valid creadentials' });
        }

        const data = {
            user:{
                  id: user.id,
                  name: user.name
              }
          }

        const authToken = jwt.sign(data, jwt_secret);
        success = true;
        res.status(200).send({ success, authToken });

    } catch (error) {
        res.status(500).send('Internal Server Error');
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

// router.put('/likes',checkUser,(req,res)=>
// {
    
// })

module.exports = router;