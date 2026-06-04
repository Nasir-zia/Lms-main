import jwt from 'jsonwebtoken';


const verifyRole = (req,res , next) => {
  let token;
  let authHeader = req.headers.authorization || req.headers.Authorization; 
  if(authHeader && authHeader.startsWith("Bearer")){
    token = authHeader.split(" ")[1];

    if(!token){
      return res.status(401).json({message : "Unauthorized , no token"})
    }
    try {
      
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("decoded user info from verifyRole middleware" , decode);
      next();
    } catch (error) {
      return res.status(403).json({message : "forbidden access"})
    }



  }
}

export default verifyRole;