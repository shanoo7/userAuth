import userModal from "../modal/userModal.js";
import bcryptjs from 'bcryptjs'


class UserFunction {

    static createUser = async (req,res)=>{
        const {name,email,password,confPassword,tc} = req.body;
        const user = await userModal.findOne({email:email})
        try {
            if(user){
                res.status(409).json({message:"Email already exists"})
            }else{
               if(name && email && password && confPassword && tc){
                if(password===confPassword){
                
                    const hashPass = await bcryptjs.hash(password,10)
                    const user = new userModal({
                        name:name,
                        email:email,
                        password:hashPass,
                        tc:tc
                    })
                    await user.save();
                    res.status(201).json({message:"User created successfully",user})
                   
                }else{
                    res.status(400).json({message:"Password does not match"})
                }
               }else{
                res.status(400).json({message:"All fields are required"})
               }
            }
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    };

    static loginUser = async (req,res)=>{
        const {email,password} = req.body;
        const user = await userModal.findOne({email:email})
        try {
            if(email && password){
                if(user){
                    const isMatch = await bcryptjs.compare(password,user.password);
                    if(isMatch && user.email===email){
                        res.status(201).json({message:"User login successfully"})
                    }else{
                        res.status(401).json({message:"User email & password does not match"})
                    }
                }else {
                    res.status(404).json({message:"User not exists"})
                }
              
            }else{
                res.status(400).json({message:"All fields are required"})
            } 
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
    }
}

export default UserFunction ;      