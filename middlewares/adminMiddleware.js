

const isAdmin = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/user/login'); 
    }

    if (!req.session.user.adminStatus) {
        return res.status(403).send('Bro youre not admin, go sleep'); 
    }
    next();
};

module.exports = isAdmin