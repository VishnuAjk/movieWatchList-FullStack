import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }
  const token = authHeader.split(' ')[1];
 

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, "4UcvuSDRRu6YKwtbiylv4qu1qRiZ03UQ"); // Verify using JWT_SECRET
    // console.log('Decoded:', decoded); // Add this log
    req.user = decoded;
    next();
  } catch (ex) {
    console.error('Token verification error:', ex); // Add this log
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

export default jwtAuth;
