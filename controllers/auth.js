const jwt = require("jsonwebtoken");
const users = require('../db/users.json');

const auth = (req,res) =>{
    const {username , password} = req.body;
    const user = users.find(user => user.username ===username && user.password ===password);
    if(!user){
        return res.status(404).send(`Credenzialo errate. ${username} ${password}`)
    }
    res.send('credenziali valide');
}

module.exports= {
    auth,
}