import jwt from 'jsonwebtoken';

export const generateToken= (user) => {
    return jwt.sign({
      _id: user._id,
      fullName: user.fullName,
      isVerified: user.isVerified,
      email: user.email,
      role:  user.role
    },
    process.env.JWT_SECRET, 
    {
      expiresIn: "30d"
    }
    )
  }
  
  // middle-wares
  export const isAuth = (req, res, next) => {
      const authorization= req.headers.authorization
      
      if(authorization){
          const token = authorization.slice(7, authorization.length)
          jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if(err){
              res.status(401).send({message: "Invalid or expired token"})
            } else {
              req.user= decode
              next()
            }
          })
  
      } else {
        res.status(401).send({message: "No token"})
      }
  }

export const isAdmin=(user) => {
    return user.role == "admin"
}

export const isAgent=(user) => {
  return user.role == "agent"
}

export const isClient=(user) => {
  return user.role == "client"
}

export const isLandlord=(user) => {
  return user.role == "landlord"
}

export const isAuthor=(user, author) => {
  return String(user._id) === String(author._id)
}