import jwt from 'jsonwebtoken'

//jwt
export const maxAge = 3*24*60*60;
export const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: maxAge
    });
}