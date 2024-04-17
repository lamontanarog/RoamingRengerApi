const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'password';

// exports.register = async (req,res) => {
//     try {
//         const {username, password} = req.body;
//         console.log('user', username, 'passw', password);

//         const userExists = await User.findOne({username: username});
//         if (userExists){
//             return res.status(400).json({message: 'User already exists'});
//         }
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = {username, password: hashedPassword};
//         User.create(newUser);
//         res.status(201).json({message:'user registered succesfully'});
//     } catch (error) {
//         res.status(400).json({message: error.message});
//     }
// }

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("user", username, "pass", password)

        const userExists = await User.findOne({ username: username });

        if (userExists) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword };
        User.create(newUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        
        if(!user){
            return res.status(400).json({message: 'Invalid User'});
        }
        if(await bcrypt.compare(password, user.password)){
            const token = jwt.sign({username: user.username}, JWT_SECRET);
            return res.json( {token});
        } else {
            return res.status(401).json({message: 'Invalid username or password'});
        }
    } catch (error) {
        res.status(400).json({message : error.message});
    }
};

exports.logout = async (req, res) => {
    res.json({message: 'Logged out succesfully'});
}