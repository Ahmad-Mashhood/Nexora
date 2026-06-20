export const seller = (req, res, next) => {
  if (req.user && req.user.role === "seller") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as seller");
  }
};
