const jwt = require("jsonwebtoken");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    console.log(accessToken, " ===> accessToken");

    if (!accessToken) {
      throw { status: 401, message: "Unauthorized" };
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    console.log(decoded, " ====> decoded");

    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw { status: 401, message: "Unauthorized" };
    }

    console.log(user, " ====> user");

    req.user = {
      id: user.id,
      email : user.email,
      role : user.role};

    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token" });
  }
}

module.exports = authentication;
