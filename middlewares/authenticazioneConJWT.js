const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{

    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).send(`Hai bisogno di autenticarti. ${authorization}`);
    }

    const token = authorization.split(" ")[1];
    //jwt.verify(token, process.env.JWT_SECRET) restituisce se va a buon fine il payload che sarebbe l'user
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(403).send(err);
        }
        req.user=user
        next();
    })
}