import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(handleError(401, "Unathorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(handleError(401, " really notUnathorized"));
    }
    req.user = user;
    next();
  });
};
