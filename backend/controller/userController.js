import userModal from "../modal/userModal.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer';


class UserFunction {

    //CREATE USER
    static createUser = async (req, res) => {
        const { name, email, password, confPassword, tc, role } = req.body;
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
                            tc: tc,
                            role: role
                        })
                        await user.save();

                        // JWT TOKEN START
                        const savedUser = await userModal.findOne({ email: email });
                        const token = jwt.sign({ userID: savedUser._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '5m' })
                        // JWT TOKEN END

                        // CREATEUSERDATA
                        res.status(201).json({ success: true, data: savedUser, token: token, message: "User created successfully" })

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
            res.status(500).json({ success: false, error: error.message, message: "internal server error" })
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
                        const token = jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: '1d' })
                        // JWT TOKEN END
                        res.status(201).json({ success: true, data: user, token: token, message: "User login successfully" })
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
            res.status(500).json({ success: false, error: error.message, message: "Internal server error" })
        }
    }

    //CHANGE USER PASSWORD
    static changeUserPassword = async (req, res) => {
        try {
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
                        res.status(201).json({ success: true, message: "Password changed successfully" })
                        // console.log(newPassword)
                    }

                } else {
                    res.status(401).json({ message: "Password does not match" })
                }
            } else {
                res.status(401).json({ message: "All feilds are required" })
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message, message: "Internal server error" });
        }
    }

    //GET USER DETAILS
    static userDetails = async (req, res) => {
        try {
            res.status(200).json({ success: true, data: req.user, message: "Get current user details" })

        } catch (error) {
            res.status(500).json({ success: false, error: error.message, message: "Internal server error" });
        }
    }

    //GET ALL USERS
    static getAllUsers = async (req, res) => {
        try {
            const users = await userModal.find().select("-password -__v -tokens")
            res.status(200).json({ success: true, data: users, message: "All users retrieved successfully" })
        } catch (error) {
            res.status(500).json({ success: false, error: error.message, message: "Internal server error" });
        }
    }

    //DELETE ALL USERS
    static deleteAllUsers = async (req, res) => {
        try {
            const users = await userModal.deleteMany({});
            res.status(200).json({ success: true, deletedCount: users.deletedCount, message: "All users deleted successfully" })
        } catch (error) {
            res.status(500).json({ success: false, error: error.message, message: "Failed to delete users" });
        }
    }

    //FORGET PASSWORD
    // static forgotPassword = async (req, res) => {
    //     const { email } = req.body;
    //     if (email) {
    //         const user = await userModal.findOne({ email: email })
    //         console.log(user)
    //         if (user) {

    //             // Generate 6-digit OTP
    //             const otp = Math.floor(100000 + Math.random() * 900000).toString();
    //             const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    //             console.log(otp)
    //             console.log(otpExpiry)
    //             user.otp = otp;
    //             user.otpExpiry = otpExpiry;
    //             await user.save();

    //             // Send email with OTP
    //             const transporter = nodemailer.createTransport({
    //                 host: process.env.EMAIL_HOST,
    //                 port: process.env.EMAIL_PORT,
    //                 secure: false,
    //                 auth: {
    //                     user: process.env.EMAIL_USER,
    //                     pass: process.env.EMAIL_PASS,
    //                 },
    //             });
    //             ////

    //             const info = await transporter.sendMail({
    //                 from: process.env.EMAIL_FROM, // sender address
    //                 to: email, // list of receivers
    //                 subject: "Your OTP Code", // Subject line
    //                 text: `Your OTP code is ${otp}`, // plain text body
    //                 html: `<b>Your OTP code is ${otp}</b>`, // html body
    //             });
    //             console.log("Message sent: %s", info.messageId);



    //             res.status(201).json({ success: true, message: "forget password OTP sent to the email" })
    //         } else {
    //             res.status(401).json({ success: false, message: "email not found" })
    //         }
    //     } else {
    //         res.status(401).json({ success: false, message: "email is required" })

    //     }
    // }


    static forgotPassword = async (req, res) => {
        const { email } = req.body;
        if (email) {
            const user = await userModal.findOne({ email: email });
            if (user) {

                // Check if OTP already exists and hasn't expired
                if (user.otp && user.otpExpiry > Date.now()) {
                    return res.status(400).json({ success: false, message: "OTP already sent. Please check your email." });
                }

                // Generate 6-digit OTP
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                const otpExpiry = new Date(Date.now() + 1 * 60 * 1000); // OTP expires in 1 minutes
                user.otp = otp;
                user.otpExpiry = otpExpiry;
                await user.save();

                // Send email with OTP
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: process.env.EMAIL_PORT,
                    secure: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });

                const receiver = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: "Your OTP Code",
                    text: `Your OTP code is ${otp}`,
                };
                const info = await transporter.sendMail(receiver);
                // console.log("Message sent:", info);
                res.status(201).json({ success: true, info: info, message: "Password reset OTP sent to your email" });
            } else {
                res.status(401).json({ success: false, message: "Email not found" });
            }
        } else {
            res.status(401).json({ success: false, message: "Email is required" });
        }
    };


    //USER PASSWORD RESET
    static resetPassword = async (req, res) => {
        const { newPassword, otp } = req.body;

        try {
            if (!newPassword || !otp) {
                return res.status(400).json({ message: "All fields are required" });
            }

            // Find user by OTP
            const user = await userModal.findOne({ otp: otp });

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            // Verify OTP and expiry
            if (Date.now() > user.otpExpiry) {
                return res.status(401).json({ message: "OTP has expired" });
            }

            // Hash new password
            const hashPass = await bcryptjs.hash(newPassword, 10);

            // Update user password and clear OTP fields
            await userModal.findByIdAndUpdate(user._id, {
                $set: { password: hashPass, otp: null, otpExpiry: null }
            });

            return res.status(201).json({ message: "Password reset successfully" });

        } catch (error) {
            // console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };


}

export default UserFunction;      