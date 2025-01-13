import jwt from 'jsonwebtoken'
import userModal from '../modal/userModal.js'


const CheckAuthUser = async (req, res, next) => {

    try {

        //get token from header
        let token
        const { authorization } = req.headers;
        // console.log(authorization)
        if (authorization && authorization.startsWith('Bearer')) {
            token = authorization.split(' ')[1];

            //verify token
            const { userID } = jwt.verify(token, process.env.JWT_KEY)
            // console.log(userID)
            //get user from token
            res.user = await userModal.findById(userID).select('-password')
            next()
        } else {
            res.status(404).json({ message: "token invalid" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }

}

export default CheckAuthUser;


