const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

function signJwt(payload){
    return jwt.sign(payload,SECRET)
}

function verifyJwt(token){
    return jwt.verify(token,SECRET)
}

module.exports = {signJwt,verifyJwt}