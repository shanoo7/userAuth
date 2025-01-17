import express from 'express'
import UserFunction from '../controller/userController.js'
import CheckAuthUser from '../middleWare/authMiddleWare.js'

const router = express.Router()

//middleWare routes check
router.use("/changeUserPassword",CheckAuthUser)
router.use("/userDetails",CheckAuthUser)

//public routes
router.post("/createUser",UserFunction.createUser)
router.post("/loginUser",UserFunction.loginUser)
router.post("/forgotPassword",UserFunction.forgotPassword)
router.post("/resetPassword/:id/:token",UserFunction.resetPassword)

//private routes
router.post("/changeUserPassword",UserFunction.changeUserPassword)
router.get("/userDetails",UserFunction.userDetails)



export default router;