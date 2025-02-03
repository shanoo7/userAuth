import jwt from 'jsonwebtoken'
import userModal from '../modal/userModal.js'


const CheckAuthUser = (allowedRoles) => {
    return async (req, res, next) => {
        try {

            //get token from header
            let token
            const { authorization } = req.headers;
            // console.log(authorization)
            if (authorization && authorization.startsWith('Bearer')) {
                token = authorization.split(' ')[1];   // i have collected jwt token from frontend if user loggedin.
                // now verify token is valid or not.
                const { userID } = jwt.verify(token, process.env.JWT_KEY)
                // console.log(userID)
                //get user from token
                req.user = await userModal.findById(userID).select("-password")

                // Role check 
                if (allowedRoles && !allowedRoles.includes(req.user.role)) {
                    return res.status(403).json({ message: "Access denied!" });
                }
                next()
            } else {
                res.status(404).json({ message: "token invalid" })
            }
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }

    }
}

export default CheckAuthUser;


