const rolecheck = (...allowedRole) => {
return (req, res, next) => {
 if(!allowedRole.includes(req.user.role)){
    return res.status(403).json({message : "forbidden access "})
 }
 next();
}
}

export default rolecheck;