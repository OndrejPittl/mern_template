import jwt from 'jsonwebtoken';
import config from '../config/config';

export default (req, res, next) => {
  const authHeader = req.get('Authorization'); // Authorization: Bearer xxx
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1]; // Bearer xxx –> xxx
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.authSecret);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
}
