function adminMiddleware(req,res,next){
    console.log(req.session.userLogged)
    if(!req.session.userLogged  || req.session.userLogged.user_type.data[0]==0){
        return res.redirect('/');
    }
    next();
}

module.exports=adminMiddleware;