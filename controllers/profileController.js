const profileController = (req, res, next) => {
    try{
        return res.status(200).send("This is now private");
    }
    catch (err) {
        next(err);
    }
};

module.exports = profileController;