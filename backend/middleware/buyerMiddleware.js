const isBuyer = (user) => user?.role === "buyer" || user?.role === "user";

export const buyer = (req, res, next) => {
  if (req.user && isBuyer(req.user)) {
    next();
  } else {
    res.status(403);
    throw new Error("Only buyers can perform this action");
  }
};
