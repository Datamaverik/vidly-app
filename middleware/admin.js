module.exports = function (req, res, next) {
  //  req.user is set after the auth middleware
  //  this middleware is executed after the auth middleware so we can use the req.user
  //  401 Unauthorized: The token sent is invalid, we give the user another chance to send a valid token
  //  403 Forbiddend: The token sent is valid, still the user isn't allowed.
  if (!req.user.isAdmin) return res.status(403).send("Accedss Denied");
  next();
};
 