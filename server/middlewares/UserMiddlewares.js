const { jwtTokenError, noJwtToken } = require("../actions/errorMessages")
const JWT_SECRET = process.env.JWT_SECRET
const jwt = require("jsonwebtoken")

async function useAuth(req, res, next) {
    const token = req.cookies.jwt
  
    if (!token) {
      return res.status(400).json(noJwtToken)
    }
  
    jwt.verify(token, JWT_SECRET, async function (err, decoded) {
      if (err) {
        return res.status(400).json(jwtTokenError)
      }
      req.user = decoded;
      next()
    })
  }

module.exports={
  useAuth 
}