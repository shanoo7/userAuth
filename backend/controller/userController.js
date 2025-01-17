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
                        const savedUser = await userModal.findOne({ email: email });
                        const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_KEY, { expiresIn: '5m' })
                        // JWT TOKEN END

                        // CREATEUSERDATA
                        res.status(201).json({ message: "User created successfully", savedUser, 'token': token })

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
                        const token = jwt.sign({ userID: user._id }, process.env.JWT_KEY, { expiresIn: '1d' })
                        // JWT TOKEN END
                        res.status(201).json({ message: "User login successfully", user, "token": token })
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
    static changeUserPassword = async (req, res) => {
        const { oldPassword, password, confPassword } = req.body

        if (oldPassword && password && confPassword) {
            if (password === confPassword) {
                const user = await userModal.findById(req.user._id)
                if (!user) {
                    res.status(401).json({ message: "user not found" })
                }
                const isMatch = await bcryptjs.compare(oldPassword, user.password)
                if (!isMatch) {
                    res.status(401).json({ message: "oldPassword incorrect" })
                } else {
                    const newPassword = await bcryptjs.hash(password, 10)
                    await userModal.findByIdAndUpdate(req.user._id, { $set: { password: newPassword } })
                    res.status(201).json({ message: "Password changed successfully" })
                    // console.log(newPassword)
                }

            } else {
                res.status(401).json({ message: "Password does not match" })
            }
        } else {
            res.status(401).json({ message: "All feilds are required" })
        }
    }

    //GET USER DETAILS
    static userDetails = async (req, res) => {
        res.status(200).json({ "user": req.user })
    }

    //FORGET PASSWORD
    static forgotPassword = async (req, res) => {
        const { email } = req.body;
        if (email) {
            const user = await userModal.findOne({ email: email })
            console.log(user)
            if (user) {
                const secretToken = user._id + process.env.JWT_KEY
                const token = jwt.sign({ userID: user._id }, secretToken, { expiresIn: "50m" })
                //frontend link
                const link = `http://localhost:3000/forgotPassword/${user._id}/${token}`
                console.log(link)
                res.status(201).json({ message: "forget password link sent to the email" })
            } else {
                res.status(401).json({ message: "email not found" })
            }
        } else {
            res.status(401).json({ message: "email is required" })
        }
    }

    //USER PASSWORD RESET
    static resetPassword = async (req, res) => {
        const { password, confPassword } = req.body;
        const { id, token } = req.params;
        const user = await userModal.findById(id)
        const secret_Token = user._id + process.env.JWT_KEY
        console.log(user._id)
        try {
            jwt.verify(token, secret_Token)
            if (password && confPassword) {
                if (password === confPassword) {
                    const hashPass = await bcryptjs.hash(password, 10)
                    await userModal.findByIdAndUpdate(user._id, { $set: { password: hashPass } })
                    res.status(201).json({ message: "password reset successfully" })
                } else {
                    res.status(401).json({ message: "password does not match" })
                }
            } else {
                res.status(401).json({ message: "all fields are required" })
            }
        } catch (error) {
            res.status(500).json({ message: "invailid token" })
        }
    }

}

export default UserFunction;      