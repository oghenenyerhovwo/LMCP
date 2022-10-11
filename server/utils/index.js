import { sendConfirmationEmail, sendPasswordResetEmail } from "./email.js"
import { generateToken, isAuth, isAuthor, isAdmin, isAgent, isClient, isLandlord } from "./auth.js"


export  {
  sendConfirmationEmail,
  sendPasswordResetEmail,
  generateToken,
  isAuth,
  isAuthor,
  isAgent,
  isAdmin,
  isClient,
  isLandlord,
}


