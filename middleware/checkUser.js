const jwt = require('jsonwebtoken');
const jwt_secret = 'instagram2.o';

const checkUser = (req,res,next)=>
{
   const token = req.header("authToken");

   if(!token)
   {
     return res.status(401).send({error:'Access Denied'});
   }

   const verifyResult = jwt.verify(token,jwt_secret);
   req.user = verifyResult.user;
   next();
}

module.exports = checkUser;