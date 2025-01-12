import express from 'express'
import UserFunction from '../controller/userController.js'


const router = express.Router()

//public routes
router.post("/createUser",UserFunction.createUser)
router.post("/loginUser",UserFunction.loginUser)



export default router;