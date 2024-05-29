const jwt = require("jsonwebtoken");
require("dotenv").config();
const users = require('../db/users.json');

const generaToken= (user) =>{
    const payload = user;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1m"});
    return token;
}

const auth = (req,res) =>{
    const {username , password} = req.body;
    const user = users.find(user => user.username ===username && user.password ===password);
    if(!user){
        return res.status(404).send(`Credenzialo errate. ${username} ${password}`)
    }

    token = generaToken(user);
    res.send(token);
}

module.exports= {
    auth,
}