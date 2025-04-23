function authorization(req, res, next) {
  let role = req.user.role;
  if (role !== "admin") {
    res.status(403).json({ message: "Forbidden" });
  }
}

module.exports = authorization;
