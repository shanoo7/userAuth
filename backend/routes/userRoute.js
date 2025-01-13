import express from 'express'
import UserFunction from '../controller/userController.js'
import CheckAuthUser from '../middleWare/authMiddleWare.js'

const router = express.Router()

//middleWare routes check
router.use("/changeUserPassword",CheckAuthUser)

//public routes
router.post("/createUser",UserFunction.createUser)
router.post("/loginUser",UserFunction.loginUser)

//private routes
router.post("/changeUserPassword",UserFunction.changeUserPassword)



export default router;