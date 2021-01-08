//Authorize user, check whether the user has enough credit
module.exports = (req, res, next) => {
    if(!req.user.credit < 1){
        return res.status(403).send({ error: "Not enough credits!"});
    }

    next();
}