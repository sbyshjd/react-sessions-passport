module.exports.isAuth = (req, res, next) => {
  console.log('o que me diz session', req.session);
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      success: false,
      user: null,
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    next();
  } else {
    return res.status(401).json({
      msg:
        'You are not authorized to view this resource because you are not an admin.',
    });
  }
};
