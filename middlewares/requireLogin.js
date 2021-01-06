//Authorize user, check whether the user has logged in and only after that the user can pay some money
module.exports = (req, res, next) => {
    if(!req.user){
        return res.status(401).send({ error: "You must log in!"});
    }

    next();
}
