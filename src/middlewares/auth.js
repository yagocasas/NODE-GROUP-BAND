const User = require("../api/users/users.model");

const { verifyJwt } = require("../utils/jwt/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
        return next("Unauthorized");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogged = await User.findById(validToken.id);

    userLogged.password = null;
    req.user = userLogged;
    next();
  } catch (error) {
    return res.status(401).json("necesitas loguearte");
  }
};

const isAdmin = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
          return res.status(401).json("necesitas loguearte");
      }
      const parsedToken = token.replace("Bearer ", "");
      const validToken = verifyJwt(parsedToken);
      const userLogged = await User.findById(validToken.id);
  
      userLogged.password = null;
      req.user = userLogged;
      next();
    } catch (error) {
      return res.status(403).json("necesitas loguearte") ;
    }
  };

module.exports = { isAuth, isAdmin };
