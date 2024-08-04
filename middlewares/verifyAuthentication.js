const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const strategyAndToken = req.headers.authorization.split(" ");
  const strategy = strategyAndToken[0];
  const tokenGenerated = strategyAndToken[1];

  if (strategy.toLocaleLowerCase() == "bearer") {
    const userDetails = jwt.verify(tokenGenerated, process.env.AUTH_KEY);

    req.userDetails = userDetails;

    if (userDetails) {
      console.log("user details", req.userDetails);
      next();
    } else {
      res.status(403).send(
        { message: "User details is empty for the token provided" });
    }
  } else {
    res.status(403).send({ message: "You are not authorized" });
  }
};

module.exports = verifyAuth;
