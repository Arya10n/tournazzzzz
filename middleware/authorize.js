const isAuthorize = (req, res, next) => {
    if(req.user) {
        console.log("User is logged in");
        next();
    } else {
        console.log("User is not logged in");
        res.redirect('/');
    }
}

module.exports = isAuthorize;