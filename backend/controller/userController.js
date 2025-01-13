import userModal from "../modal/userModal.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


class UserFunction {

    //CREATE USER
    static createUser = async (req, res) => {
        const { name, email, password, confPassword, tc } = req.body;
        const user = await userModal.findOne({ email: email })
        try {
            if (name && email && password && confPassword && tc) {
                if (!user) {
                    if (password === confPassword) {

                        const hashPass = await bcryptjs.hash(password, 10)
                        const user = new userModal({
                            name: name,
                            email: email,
                            password: hashPass,
                            tc: tc
                        })
                        await user.save();

                        // JWT TOKEN START
                        const savedUser = await userModal.findOne({email:email});
                        const token = jwt.sign({userID:savedUser._id},process.env.JWT_KEY,{expiresIn:'5m'})
                        // JWT TOKEN END

                        // CREATEUSERDATA
                        res.status(201).json({ message: "User created successfully", savedUser, 'token':token})

                    } else {
                        res.status(400).json({ message: "Password does not match" })
                    }
                } else {
                    res.status(409).json({ message: "Email already exists" })
                }
            } else {
                res.status(400).json({ message: "All fields are required" })
            }
        } catch (error) {
            res.status(500).json({ message: "internal server error" })
        }

    }

    //LOGIN USER
    static loginUser = async (req, res) => {
        const { email, password } = req.body;
        const user = await userModal.findOne({ email: email })
        try {
            if (email && password) {
                if (user) {
                    const isMatch = await bcryptjs.compare(password, user.password);
                    if (isMatch && user.email === email) {

                         // JWT TOKEN START
                         const token = jwt.sign({userID:user._id},process.env.JWT_KEY,{expiresIn:'5m'})
                         // JWT TOKEN END
                        res.status(201).json({ message: "User login successfully", user, "token":token })
                    } else {
                        res.status(401).json({ message: "User email & password does not match" })
                    }
                } else {
                    res.status(404).json({ message: "User not exists" })
                }

            } else {
                res.status(400).json({ message: "All fields are required" })
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    }

    //CHANGE USER PASSWORD
    static changeUserPassword = async (req,res)=>{
        const {password,confPassword} = req.body

        if(password && confPassword){
            if(password === confPassword){
            
                const newPassword = await bcryptjs.hash(password,10)
                await userModal.findByIdAndUpdate(res.user._id,{$set:{password:newPassword}})
                res.status(201).json({message:"Password changed successfully"})
                // console.log(newPassword)

            }else{
                res.status(401).json({message:"Password does not match"})
            }
        }else{
            res.status(401).json({message:"All feilds are required"})
        }
    }
}

export default UserFunction;      