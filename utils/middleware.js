const jwt = require("jsonwebtoken");

exports.adminAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({
      data: "Authorization Failed",
      success: false,
    });
  }
  console.log(authHeader);
  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      data: "Missing Authorization Token",
    });
  }
  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
