// authenticates if user is logged in or not.
module.exports = (req, res, next) => {
  // next is called when the middleware is ready like (done or return)

  // check if user is logged in
  if (!req.user) {
    // 401 means authentication forbidden
    return res.status(401).send({ error: "You must log in" });
  }

  // else if the user exists or is online
  next();
};
